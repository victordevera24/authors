import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  addNewAuthor(newAuthor) {
    return this._http.post('/authors', newAuthor)
  }

  getAuthors() {
    return this._http.get('/authors')
  }

  newEditAuthor(editAuthor) {
    return this._http.put('/authors/'+editAuthor._id, editAuthor)
  }

  getOneAuthor(id) {
    return this._http.get('/authors/' +id)
  }

  deleteAuthor(id) {
    return this._http.delete('/authors/'+id)
  }
}
