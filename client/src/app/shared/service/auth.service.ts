import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../entities/user'
import { ValidatePassMatch } from '../validators/pass-match.validator';
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
    private fb: FormBuilder,
    public router: Router,
  ) { }

  // Register
  registerUser(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, JSON.stringify(user))
      .pipe(
        catchError(this.handleError)
      )
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      username: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: this.fb.group({
        password: new FormControl ('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
      }, { validator: ValidatePassMatch })
    });
  }

  login(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, JSON.stringify(user))
      .pipe(
        map ((res: any) => {
        localStorage.setItem('access_token', res.token)
          this.currentUser = res;
          this.router.navigate(['']);
          return res
        }))
      }


  getToken() {
    return localStorage.getItem('access_token');
  }

  tokenExpired () {
    return !this.jwtHelper.isTokenExpired('access_token')
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
