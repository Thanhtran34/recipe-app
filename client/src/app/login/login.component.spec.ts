import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, OverlayModule],
      declarations: [LoginComponent],
      providers: [RouterTestingModule, MatSnackBar, OverlayModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue("");
    expect(password.hasError('required')).toBeTruthy();

    password.setValue("Test");
    expect(password.hasError('minlength', ['minlength'])).toEqual(false);
  });

  it('should call submit method', () => {
    spyOn(component, 'submit');
    component.submit()
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.loginForm.controls.email.setValue('test@yahoo.com');
    component.loginForm.controls.password.setValue('Hatinh123%');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
