var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('session');

var app = express();

app.set('view enigine', 'ejs');
app.set('views', path.join(__dirname + './views'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/project/dist'))

mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise; 

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: [true, "You need to enter name"], minlength: 1},
    created_at: String
})
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model("Author")

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

app.get('/authors', function(req, res) {  /////////view all
    Author.find({}, function(err, authors) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "error", error: err});
        } else {
            console.log('success');
            res.json({message: 'success', authors: authors});
        }
    })
})


app.post('/authors', function(req, res) {   ////////////make new 
    console.log("POST DATA", req.body);
    var author = new Task(req.body);
    author.save(function(err) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "error", error: err});
        } else {
            console.log('successfully added a author!');
            res.json({message: 'successfully added author '});
        }
    })
})

app.get('/authors/:id', function(req, res) {  ////////// get by id
    console.log(req.params.id);
    Author.find({_id:req.params.id}, function(err, author) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            console.log('people:', author);
            if (author.length == 0) {
                console.log('author not found');
                res.json({message: 'author not found', author: author});
            }
            else {
                console.log('successfully found the author!');
                res.json({message: 'successfully found author ', author: author});
            }
        }
    })
})

app.put('/authors/:id', function(req, res) {  //////////   update 
    var obj = {};

    if (req.body.name) {
        obj['name'] = req.body.name;
    }

    Author.update({_id:req.params.id}, {
        $set: obj
    }, function(err, author) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            res.json({message: 'success', data: author});
        }
    })
})


app.delete('/authors/:id', function(req, res) { ////////// delete
    Author.remove({_id:req.params.id}, function(err) {
        if(err) {
            console.log('something went wrong', err);
            res.json({message: "db error", error: err});
        } else {
            console.log('successfully removed author!');
            res.json({message: 'successfully removed author '});
        }
    })
})

app.listen(8000, function() {
    console.log('running this express project on port 8000')
})