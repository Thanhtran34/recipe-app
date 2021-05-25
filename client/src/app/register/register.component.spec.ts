import { OverlayModule } from '@angular/cdk/overlay';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/service/auth.service';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        OverlayModule
      ],
      providers: [
        AuthService,
        NgxSpinnerService,
        FormBuilder,
        MatSnackBar
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let username = component.registerForm.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue("");
    expect(username.hasError('required')).toBeTruthy();
  });

  it('email field validity', () => {
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue("");
    expect(password.hasError('required')).toBeTruthy();

    password.setValue("A");
    expect(password.hasError('minlength', ['minlength'])).toEqual(false);
  });

  it('password2 field validity', () => {
    let password2 = component.registerForm.controls['password2'];
    expect(password2.valid).toBeFalsy();

    password2.setValue("");
    expect(password2.hasError('required')).toBeTruthy();
  });

  it('should call submit method', () => {
    spyOn(component, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.registerForm.controls.username.setValue('test');
    component.registerForm.controls.email.setValue('test@yahoo.com');
    component.registerForm.controls.password.setValue('Hatinh123%');
    component.registerForm.controls.password2.setValue('Hatinh123%');
    expect(component.registerForm.valid).toBeTruthy();
  });

});
