import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../entities/user'
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  // Register
  registerUser(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post<any>(api, user, { headers: this.headers})
      .pipe(
        catchError(this.handleError)
      )
  }

  loginUser(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .pipe(
        map ((res: any) => {
        localStorage.setItem('access_token', res.token)
          this.currentUser = res;
          this.router.navigate(['/']);
          return res
        }))
      }


  getToken() {
    return localStorage.getItem('access_token');
  }

  tokenExpired () {
    return !this.jwtHelper.isTokenExpired('access_token')
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

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
