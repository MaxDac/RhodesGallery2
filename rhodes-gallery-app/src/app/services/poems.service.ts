import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Poem, PoemType} from './dtos';
import {Helpers} from './helpers';
import {Result} from './base-types';

@Injectable({providedIn: 'root'})
export class PoemsService {
  constructor(private http: HttpClient) {}

  getTypes() {
    const uri = Helpers.getCompleteUri('/Poem/Types');
    return this.http.get<Result<PoemType[]>>(uri)
      .map(Helpers.manageResponse);
  }

  getAllPoems() {
    const uri = Helpers.getCompleteUri('/Poems');
    return this.http.get<Result<Poem[]>>(uri)
      .map(Helpers.manageResponse);
  }

  getPoemByType(type: number) {
    const uri = Helpers.getCompleteUri(`/Poem/Type/${type}`);
    return this.http.get<Result<Poem[]>>(uri)
      .map(Helpers.manageResponse);
  }

  getPoemById(id: number) {
    const uri = Helpers.getCompleteUri(`/Poem/${id}`);
    return this.http.get<Result<Poem[]>>(uri)
      .map(Helpers.manageResponse);
  }
}
