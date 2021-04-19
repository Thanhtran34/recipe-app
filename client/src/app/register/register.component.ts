import { AuthService } from './../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    public fb: FormBuilder,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required, RxwebValidators.compare({ fieldName:'password' })])
      })
    }

  submit() {
    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      //this.spinner.show()
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
