import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoggedOutGuard } from './logged-out.guard';

describe('LoggedOutGuard', () => {
  let guard: LoggedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(LoggedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
