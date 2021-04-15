import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';
import { User } from '../shared/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.authService.getFormGroup();
  }

  submit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.username = form.value.username;
    user.email = form.value.email;
    user.password = form.value.passwords.password;
    user.password2 = form.value.passwords.password2

    this.spinner.show();
    this.authService.registerUser(user)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.router.navigate(['login']);
      }, (err: HttpErrorResponse) => {
        if (err.error.emailUsed) {
          this.registerForm.controls['email'].setErrors({ 'taken': true });
        }
        if (err.error.usernameUsed) {
          this.registerForm.controls['username'].setErrors({ 'taken': true });
        }
      });
  }

}
