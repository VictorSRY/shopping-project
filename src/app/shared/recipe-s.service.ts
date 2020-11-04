import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeSService {
  recipes:Recipe[] = [new Recipe(0,'iLu', "i l U", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg",[new Ingredient('apple',10)]),new Recipe(1,'iLu2', "i l U 2", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg",[new Ingredient('apple',10)]) ] 
  
  recipeSlected = new EventEmitter<Recipe>();

  constructor() { }

  /*getRecipe(index:number){
    console.log("getselected")
    return this.recipes[index]
  }*/
  
  getRecipeByName(name:string){
    var ans:Recipe = this.recipes.find( (recipe:Recipe)=>{
          return recipe.name===name
          }
        )
    return ans
  }
  
  getRecipe(index:number){
    return this.recipes[index]
  }

  getRecipes(){
    return this.recipes.slice()
  }

  getNewRecipeId(){
    return this.recipes.length
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
  }

  removeRecipe(index:number= -1 ,name:string=""){
    if (index === -1){
      index = this.recipeIndexOf(name)      
    }
    this.recipes.splice(index,1)
  }

  updateRecipe(recipe:Recipe, index:number){
    if(index===-1){
      index = this.recipeIndexOf(recipe.name)
    }
    this.recipes[index]=recipe
  }

  recipeIndexOf(name:string){
    this.recipes.forEach( (recipe,index) =>{
      if(recipe.name===name){
        return index
      }
    })
    return -1
  }


}
