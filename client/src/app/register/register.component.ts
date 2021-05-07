import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(7)]),
      password2: new FormControl('', [Validators.required, RxwebValidators.compare({fieldName:'password' })])
    })
  }


  submit() {
    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      if (res.userId) {
        this.spinner.show()
        setTimeout(() => {
          /** spinner ends after 1 second */
          this.spinner.hide();
        }, 500);
        this.registerForm.reset()
        this.router.navigate(['/login'])
        this.snackBar.open('Registration successful!', 'OK', { duration: 5000 });
      } else console.log(res)
    })
  }
}
