import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeComponent } from './add-recipe.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('#AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule],
      providers: [
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RecipeForm invalid when empty', () => {
    expect(component.recipeForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const creator = component.recipeForm.controls.username;
    expect(creator.valid).toBeFalsy();

    creator.setValue('');
    expect(creator.hasError('required')).toBeTruthy();
  });

  it('title field validity', () => {
    const title = component.recipeForm.controls.title;
    expect(title.valid).toBeFalsy();

    title.setValue('');
    expect(title.hasError('required')).toBeTruthy();
  });

  it('ingredients field validity', () => {
    const ingredients = component.recipeForm.controls.ingredients;
    expect(ingredients.valid).toBeFalsy();

    ingredients.setValue('');
    expect(ingredients.hasError('required')).toBeTruthy();
  });

  it('instructions field validity', () => {
    const instructions = component.recipeForm.controls.instructions;
    expect(instructions.valid).toBeFalsy();

    instructions.setValue('');
    expect(instructions.hasError('required')).toBeTruthy();
  });

  it('should call submit method', () => {
    spyOn(component, 'submitRecipeForm');
    component.submitRecipeForm();
    expect(component.submitRecipeForm).toHaveBeenCalledTimes(1);
  });

  it('Recipe form should be valid', () => {
    component.recipeForm.controls.username.setValue('test');
    component.recipeForm.controls.title.setValue('test');
    component.recipeForm.controls.category.setValue('test');
    component.recipeForm.controls.ingredients.setValue('test');
    component.recipeForm.controls.instructions.setValue('test');
    expect(component.recipeForm.valid).toBeTruthy();
  });
});
