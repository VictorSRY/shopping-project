import { Component, OnInit } from '@angular/core';
import { RecipeSService } from '../shared/recipe-s.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedR:Recipe
  
  constructor(private recipeS:RecipeSService){ }

  ngOnInit(): void {
    this.recipeS.recipeSlected.subscribe((recipe:Recipe) => {
      this.selectedR=recipe
    })
  }

}
