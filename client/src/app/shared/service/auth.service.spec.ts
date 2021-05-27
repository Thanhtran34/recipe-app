import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';

describe('#AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#registerUsers', () => {
    it('should register a user', () => {
      const dummyUser = {
        username: 'dummy',
        email: 'dummy@yahoo.com',
        password: 'Hanoi123%',
        password2: 'Hanoi123%',
        agree: true
      };

      service.registerUser(dummyUser).subscribe(
        data => expect(data).not.toEqual(' ', 'should return the userId'),
        fail
      );

      // should have made one request to register user.
      const req = httpMock.expectOne(`${service.endpoint}/register`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dummyUser);

      // Expect server to return the userId after POST
      const expectedResponse = new HttpResponse({ status: 200});
      req.event(expectedResponse);
      req.flush(expectedResponse);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
