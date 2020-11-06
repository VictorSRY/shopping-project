import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeSService } from '../shared/recipe-s.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedR: Recipe
  subscription: Subscription

  constructor(private recipeS: RecipeSService) { }

  ngOnInit(): void {
    this.subscription = this.recipeS.recipeSlected.subscribe((recipe: Recipe) => {
      this.selectedR = recipe
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
