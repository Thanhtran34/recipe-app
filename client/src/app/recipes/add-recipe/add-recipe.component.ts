import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { RecipeService } from './../../shared/service/recipe.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Category {
  name: string;
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList: any;
  @ViewChild('resetRecipeForm', { static: true }) myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  recipeForm!: FormGroup;
  categoryArray: Category[] = [];
  

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private recipeApi: RecipeService
  ) { }

  ngOnInit(): void {
    this.submitBookForm();
  }

  submitBookForm() {
    this.recipeForm = this.fb.group({
      username: ['', [Validators.required]],
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      category: [this.categoryArray],
      instructions: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.categoryArray.length < 5) {
      this.categoryArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

   /* Remove dynamic languages */
   remove(category: Category): void {
    const index = this.categoryArray.indexOf(category);
    if (index >= 0) {
      this.categoryArray.splice(index, 1);
    }
  } 
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
      return this.recipeForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitRecipeForm() {
    if (this.recipeForm.valid) {
      this.recipeApi.addRecipe(this.recipeForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigate(['/recipe-list']))
      });
    }
  }

}
