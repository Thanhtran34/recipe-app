import { OverlayModule } from '@angular/cdk/overlay';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/service/auth.service';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '../login/login.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('#RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;
  let router: Router;
  let mockUserService: any;
  let debugElement: DebugElement;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('AuthService', ['registerUser']);
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        OverlayModule,
        NoopAnimationsModule,
         RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
      ])
      ],
      providers: [
        AuthService,
        NgxSpinnerService,
        FormBuilder,
        MatSnackBar,
        { provide: AuthService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  // Unit test
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const username = component.registerForm.controls.username;
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.registerForm.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('A');
    expect(password.hasError('minlength', ['minlength'])).toEqual(false);
  });

  it('password2 field validity', () => {
    const password2 = component.registerForm.controls.password2;
    expect(password2.valid).toBeFalsy();

    password2.setValue('');
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

  // Integration test for navigation and router link
  it('should go to login page ', waitForAsync(() => {
    fixture.detectChanges();
    mockUserService.registerUser.and.returnValue(of({userId: '123456'}));
    component.submit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should have a link to /login', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties.href === '/login';
    });
    expect(index).toBeGreaterThan(-1);
  });
});
