import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../entities/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  registerUser(user: User): Observable<any> {
    const api = `${this.endpoint}/register`;
    return this.http.post<any>(api, user, { headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line:typedef
  loginUser(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
    .subscribe((res) => {
      console.log(res);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('userId', res.userId);

      const jwt = new JwtHelperService();
      jwt.decodeToken(localStorage.getItem('access_token')!);

      this.router.navigate(['']);
    });
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return localStorage.getItem('access_token');
  }

  // tslint:disable-next-line:typedef
  doLogout() {
    const removeUser = localStorage.removeItem('userId');
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['']);
    }
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
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
    return throwError(msg);
  }
}
