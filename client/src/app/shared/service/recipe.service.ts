import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../entities/recipe';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  endpoint: string = 'http://localhost:3000/api';
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

  updateRecipe(updateData: Recipe, recipeId: string) {
    return this.http.put(`${this.endpoint}/recipe/${recipeId}`, updateData, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteRecipe(recipeId: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.endpoint}/recipe/${recipeId}`, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  getRecipess(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.endpoint}/recipe`, { headers: this.headers });
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
    return throwError(msg);
  }
}
