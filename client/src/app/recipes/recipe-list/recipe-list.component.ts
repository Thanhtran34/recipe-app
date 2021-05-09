import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../../shared/entities/recipe'
import { RecipeService } from '../../shared/service/recipe.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  RecipeData: any = [];
  dataSource!: MatTableDataSource<Recipe>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'category', 'action'];

  constructor(private recipeApi: RecipeService) {
    this.recipeApi.getRecipes().subscribe(data => {
      this.RecipeData = data;
      this.dataSource = new MatTableDataSource<Recipe>(this.RecipeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
   }

  ngOnInit(): void {
  }

  delete_recipe(index: number, e: any){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.recipeApi.deleteRecipe(e.id).subscribe()
    }
  }
}
