import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Recipe } from '../entities/recipe';

import { RecipeService } from './recipe.service';

describe('#RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#addRecipe', () => {
    it('should add a recipe', () => {
      const dummyRecipe: Recipe = {
        id: '123456',
        username: 'dummy',
        title: 'test',
        ingredients: ['test'],
        category: 'test',
        instructions: 'test'
      };

      service.addRecipe(dummyRecipe).subscribe(
        res => expect(res).toBeNull,
        fail
      );

      // should add a recipe.
      const req = httpMock.expectOne(`${service.endpoint}/recipe/post`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dummyRecipe);

      // Expect server to return the recipe after POST
      const expectedResponse = new HttpResponse({ status: 200});
      req.event(expectedResponse);
      req.flush(expectedResponse);
    });
  });

  describe('#updateRecipe', () => {
    it('should update a recipe', () => {
      const id = '123456';
      const dummyRecipe: Recipe = {
        id: '123456',
        username: 'dummy',
        title: 'update',
        ingredients: ['test2'],
        category: 'test2',
        instructions: 'test2'
      };

      service.updateRecipe(dummyRecipe, id).subscribe(
        res => expect(res).toBeNull,
        fail
      );

      // should update a recipe.
      const req = httpMock.expectOne(`${service.endpoint}/recipe/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dummyRecipe);

      // Expect server to return status 204
      const expectedResponse = new HttpResponse({ status: 204});
      req.event(expectedResponse);
      req.flush(expectedResponse);
    });
  });

  describe('#deleteRecipe', () => {
    it('should delete a recipe', () => {
      const id = '123456';
      service.deleteRecipe(id).subscribe(
        res => expect(res).toBeNull,
        fail
      );

      // should delete a recipe.
      const req = httpMock.expectOne(`${service.endpoint}/recipe/${id}`);
      expect(req.request.method).toEqual('DELETE');

      // Expect server to return statuscode 204
      const expectedResponse = new HttpResponse({ status: 204});
      req.event(expectedResponse);
      req.flush(expectedResponse);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
