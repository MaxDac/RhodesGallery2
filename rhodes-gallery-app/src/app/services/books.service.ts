import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Helpers} from './helpers';
import {Book} from './dtos';
import {Result} from './base-types';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks() {
    const uri = Helpers.getCompleteUri('/Books');
    return this.http.get<Result<Book[]>>(uri)
      .map(Helpers.manageResponse);
  }
}
