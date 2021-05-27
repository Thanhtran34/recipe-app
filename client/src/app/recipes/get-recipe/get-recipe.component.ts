import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/shared/service/recipe.service';


@Component({
  selector: 'app-get-recipe',
  templateUrl: './get-recipe.component.html',
  styleUrls: ['./get-recipe.component.css']
})
export class GetRecipeComponent implements OnInit {
  recipeData: any = [];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private recipeApi: RecipeService,

  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.recipeApi.getRecipe(id!).subscribe(data => {
      this.recipeData = data;
    });
   }

  ngOnInit(): void {
  }

}
