import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
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

    // Email field is required
    expect(email.hasError('required')).toBeTruthy();

    // Set email to something
    email.setValue("test");
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('pattern')).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('pattern')).toBeFalsy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];

    // Email field is required
    expect(password.hasError('required')).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeTruthy();

    // Set email to something correct
    password.setValue("123456789");
    expect(password.hasError('required')).toBeFalsy();
    expect(password.hasError('minlength')).toBeFalsy();
});
  

});
