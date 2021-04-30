import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  shouldAgree!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.shouldAgree = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required]),
      email: new FormControl ('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required, RxwebValidators.compare({ fieldName:'password' })])
    });
  }

  submit() {
    this.authService.loginUser(this.loginForm.value)
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 1 second */
      this.spinner.hide();
    }, 500);
    this.shouldAgree = true;
    this.snackBar.open('You are now logged in!', 'OK', { duration: 5000 });
    this.authService.isLoggedIn === true;
    this.router.navigate(['']);
  };
}

