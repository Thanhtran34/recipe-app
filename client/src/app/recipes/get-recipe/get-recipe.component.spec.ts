import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';


import { GetRecipeComponent } from './get-recipe.component';

describe('GetRecipeComponent', () => {
  let component: GetRecipeComponent;
  let fixture: ComponentFixture<GetRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetRecipeComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: Router },
        { provide: ActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
