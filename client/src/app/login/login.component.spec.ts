import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { HomeComponent } from '../home/home.component';
import { DebugElement } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('#LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let mockUserService: any;
  let router: Router;


  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('AuthService', ['loginUser']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
         FormsModule,
         HttpClientTestingModule,
         NoopAnimationsModule,
         RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent }
      ]),
         OverlayModule],
      declarations: [LoginComponent],
      providers: [
        MatSnackBar,
        OverlayModule,
        { provide: AuthService, useValue: mockUserService }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.ngOnInit();
    fixture.detectChanges();
  });

  // Unit test

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('Test');
    expect(password.hasError('minlength', ['minlength'])).toEqual(false);
  });

  it('should call submit method', () => {
    spyOn(component, 'submit');
    component.submit();
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.loginForm.controls.email.setValue('test@yahoo.com');
    component.loginForm.controls.password.setValue('Hatinh123%');
    expect(component.loginForm.valid).toBeTruthy();
  });

  // Integration test for navigation and router-link
  it('should go to home page ', waitForAsync(() => {
    fixture.detectChanges();
    mockUserService.loginUser.and.returnValue(of({}));
    component.submit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  it('should have a link to /home', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const index = debugElements.findIndex(de => {
      return de.properties.href === '/register';
    });
    expect(index).toBeGreaterThan(-1);
  });
});
