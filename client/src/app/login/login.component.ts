import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs/internal/operators/finalize';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../shared/entities/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  shouldRemember: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.shouldRemember = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    user.password2 = form.value.confirmPassword;
    user.remember = this.shouldRemember;

    this.spinner.show();
    this.authService.login(user)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.spinner.show();
        this.authService.isLoggedIn === true;
        this.router.navigate(['']);
      }, () => {
        this.authService.isLoggedIn === false;
      });
  }

}
