import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../entities/recipe';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  endpoint: string = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
    ) { }

  addRecipe(recipeData: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.endpoint}/recipe`, recipeData, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  updateRecipe(data: Recipe, id: string) {
    return this.http.put(`${this.endpoint}/recipe/${id}`, data, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.endpoint}/recipe/${id}`, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.endpoint}/recipe`, { headers: this.headers });
  }

  getRecipe(id: string): Observable<any> {
    let API_URL = `${this.endpoint}/recipe/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  handleError(err: HttpErrorResponse) {
    let msg = '';
    if (err.error instanceof ErrorEvent) {
      // client-side error
      msg = err.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(msg)
    return throwError(msg);
  }
}
