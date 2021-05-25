import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeComponent } from './edit-recipe.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RecipeForm invalid when empty', () => {
    expect(component.recipeForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let title = component.recipeForm.controls['title'];
    expect(title.valid).toBeFalsy();

    title.setValue("");
    expect(title.hasError('required')).toBeTruthy();
  });

  it('ingredients field validity', () => {
    let ingredients = component.recipeForm.controls['ingredients'];
    expect(ingredients.valid).toBeFalsy();

    ingredients.setValue("");
    expect(ingredients.hasError('required')).toBeTruthy();
  });

  it('instructions field validity', () => {
    let instructions = component.recipeForm.controls['instructions'];
    expect(instructions.valid).toBeFalsy();

    instructions.setValue("");
    expect(instructions.hasError('required')).toBeTruthy();
  });

  it('should call submit method', () => {
    spyOn(component, 'updateRecipeForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.updateRecipeForm).toHaveBeenCalledTimes(1);
  });

  it('Recipe form should be valid', () => {
    component.recipeForm.controls.title.setValue('test');
    component.recipeForm.controls.category.setValue('test');
    component.recipeForm.controls.ingredients.setValue('test');
    component.recipeForm.controls.instructions.setValue('test');
    expect(component.recipeForm.valid).toBeTruthy();
  });
});
