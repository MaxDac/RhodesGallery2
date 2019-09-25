import {configuration, Result} from './base-types';
import {Observable, of} from 'rxjs';

export class Helpers {
  static getCompleteUri(uri: string): string {
    const baseUri = configuration.backendBaseUri;
    return `${baseUri}${uri}`;
  }

  static isOk<T>(response: Result<T>): boolean {
    return response.case === 'Ok';
  }

  static manageResponse<T>(response: Result<T>): T {
    if (Helpers.isOk(response)) {
      return response.fields[0];
    } else {
      throw JSON.parse(JSON.stringify(response.fields[0]));
    }
  }

  static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
