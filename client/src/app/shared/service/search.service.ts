import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  endpoint = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  search(data: Observable<any>): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/food/search`, data, { headers: this.headers })
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line:typedef
  handleError(err: HttpErrorResponse) {
    let msg = '';
    if (err.error instanceof ErrorEvent) {
      // client-side error
      msg = err.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
