import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];
  editAuthor : any;
  
  constructor (
    private _httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() { 
    this.getAuthorsFromService();
    console.log(this.activatedRoute)
  }

  getAuthorsFromService(){
    let observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      console.log('got our data!', data)
      this.authors = data['authors'];
      console.log('test', this.authors);
    })
  }

  editThisAuthor(id, name){
    this.editAuthor = { _id: id, name: name};
  }

  deleteAuthor(id){
    let observable = this._httpService.deleteAuthor(id);
    observable.subscribe(data => {
      console.log('found and delete that bitch', data)
      this.getAuthorsFromService();
    })
  }
}
