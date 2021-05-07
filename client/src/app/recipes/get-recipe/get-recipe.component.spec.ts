import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRecipeComponent } from './get-recipe.component';

describe('GetRecipeComponent', () => {
  let component: GetRecipeComponent;
  let fixture: ComponentFixture<GetRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
