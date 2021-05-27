import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { RecipeService } from './../../shared/service/recipe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Category {
  name: string;
}

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
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
    private actRoute: ActivatedRoute,
    private recipeApi: RecipeService
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.recipeApi.getRecipe(id!).subscribe(data => {
      console.log(data.category);
      this.categoryArray = data.category;
      this.recipeForm = this.fb.group({
      title: [data.title],
      ingredients: [data.ingredients, [Validators.required]],
      category: [data.category],
      instructions: [data.instructions, [Validators.required]]
      });
    });
   }

  ngOnInit(): void {
    this.updateForm();
  }

  // tslint:disable-next-line:typedef
  updateForm() {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      category: [this.categoryArray]
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.categoryArray.length < 5) {
      this.categoryArray.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }


  remove(category: Category): void {
    const index = this.categoryArray.indexOf(category);
    if (index >= 0) {
      this.categoryArray.splice(index, 1);
    }
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.recipeForm.controls[controlName].hasError(errorName);
  }

  // tslint:disable-next-line:typedef
  updateRecipeForm() {
    console.log(this.recipeForm.value);
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.recipeApi.updateRecipe(this.recipeForm.value, id!)
      .subscribe( res => {
        this.ngZone.run(() => this.router.navigate(['/recipe-list']));
      });
    }
  }

}
