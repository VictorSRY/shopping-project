import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeSService {

  recipes: Recipe[] = [new Recipe('Rabbit', "baby rabbits", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg", [new Ingredient('apple', 10)]), new Recipe('Rabbit 2', "baby rabbits 2", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg", [new Ingredient('apple', 20)])]
  updateRecipes = new Subject<Recipe[]>()
  recipeSlected = new EventEmitter<Recipe>();

  constructor() { }

  /*getRecipe(index:number){
    console.log("getselected")
    return this.recipes[index]
  }*/

  getRecipeByName(name: string) {
    var ans: Recipe = this.recipes.find( (recipe: Recipe) => {
      return recipe.name === name
    })
    return ans
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  getRecipes() {
    return this.recipes.slice()
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.updateRecipes.next(this.recipes.slice())
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.updateRecipes.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    console.log('updating recipe id:', index, "to", recipe)
    if (index === -1) {
      this.recipes.push(recipe)
    } else {
      this.recipes[index] = recipe
    }
    console.log(this.recipes[index])
    this.updateRecipes.next(this.recipes.slice())
  }

  recipeIndexOf(name: string) {
    this.recipes.forEach((recipe, index) => {
      if (recipe.name === name) {
        return index
      }
    })
    return -1
  }

}
