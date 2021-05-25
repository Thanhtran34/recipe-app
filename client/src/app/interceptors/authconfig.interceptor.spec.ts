import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthconfigInterceptor } from './authconfig.interceptor';

describe('AuthconfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule
    ],
    providers: [
      AuthconfigInterceptor,
      RouterTestingModule
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthconfigInterceptor = TestBed.inject(AuthconfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
