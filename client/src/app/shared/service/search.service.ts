import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
}
