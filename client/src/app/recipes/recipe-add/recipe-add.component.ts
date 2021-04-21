import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/entities/recipe'

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
