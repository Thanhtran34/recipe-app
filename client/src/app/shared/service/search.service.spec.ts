import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SearchService } from './search.service';

describe('#SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#searchNutrient', () => {
    it('Should return carb, energy and calories', () => {
      const dummyFood = of({
       query: 'cheese cheddar'
      });
      service.search(dummyFood).subscribe(
        data => expect(data).not.toEqual('null', 'should return carb, energy, calories'),
        fail
      );

       // should have made one request to register user.
      const req = httpMock.expectOne(`${service.endpoint}/food/search`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dummyFood);

       // Expect server to return the access token after POST
      const expectedResponse = new HttpResponse({ status: 200});
      req.event(expectedResponse);
      req.flush(expectedResponse);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
