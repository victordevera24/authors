import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editAAuthor = {_id: '', name: ''};
  authorId : any;
  listAuthor = [];


  constructor (
    private _httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authorId = this.activatedRoute.snapshot.params.id
    console.log(this.authorId)
    console.log(this.activatedRoute)
    this.oneAuthor(this.authorId);
    this.editAAuthor._id = this.activatedRoute.snapshot.params.id
    console.log(this.editAAuthor)
  }

  editAuthor(){
    let observable = this._httpService.newEditAuthor(this.editAAuthor);
    observable.subscribe(data => {
      console.log('got data from edit back', data);
    })
  }

  oneAuthor(authorId) {
    let observable = this._httpService.getOneAuthor(authorId)
    observable.subscribe(data => {
      console.log('got our 1 author', data)
      this.editAAuthor.name = data.author[0].name
      console.log(this.editAAuthor)
    })
  }

}
