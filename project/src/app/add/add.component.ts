import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newAuthor : any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.newAuthor = {name: ''}
  }

  addAuthor() {
    let observable = this._httpService.addNewAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log('got data from add back', data);
      this.newAuthor = {name: ''};
      this._router.navigate(['/home'])
    })
  }

}
