import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Helpers} from './helpers';
import {Result} from './base-types';
import {Biography, Book} from './dtos';

@Injectable({providedIn: 'root'})
export class BiographyService {
  constructor(private http: HttpClient) {}

  getBooks() {
    const uri = Helpers.getCompleteUri('/Biography');
    return this.http.get<Result<Biography[]>>(uri)
      .map(Helpers.manageResponse);
  }
}
