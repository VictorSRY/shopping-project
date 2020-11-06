import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedR: Recipe
  subscription: Subscription

  constructor(private shoppingS: ShoppingSService, private recipeS: RecipeSService, private route: ActivatedRoute, private router: Router) { }
  index: number

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((param: Params) => {
      this.index = +param['id']
      this.selectedR = this.recipeS.getRecipe(this.index)
    })
  }

  addToShoppingList() {
    this.shoppingS.addIngredients(this.selectedR.ingredients)
  }

  deleteRecipe() {
    this.recipeS.removeRecipe(this.index)
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
