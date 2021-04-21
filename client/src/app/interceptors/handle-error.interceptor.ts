import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => {
      this.spinner.hide();
      switch (err.status) {
        case 500:
          this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
          break;
        case 400:
          this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
          break;
        case 409:
          this.snackBar.open('Email and username must be unique!', 'OK', { duration: 5000 });
          break;
        case 401:
          this.snackBar.open('Email or password is incorrect!', 'OK', { duration: 5000 });
          break;
        default:
          this.snackBar.open('Something went wrong.', 'OK', { duration: 5000 });
      }
      return throwError(err);
    }));
  }
}
