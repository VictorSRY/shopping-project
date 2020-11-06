import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators'
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { RecipeSService } from './recipe-s.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http:HttpClient,private recipeS:RecipeSService) { }

  storeRecipe(){
    const recipes = this.recipeS.getRecipes()
    this.http.put("https://angular-shoppingapp-project.firebaseio.com/recipe.json",recipes).subscribe(event=>{
      console.log("Saved")
    })
  }

  fetchRecipe(){
    return this.http
    .get<Recipe[]>("https://angular-shoppingapp-project.firebaseio.com/recipe.json")
    .pipe( map( data => {
      return data.map((recipe)=>{
        return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : [] } 
      })
    }),
    tap( (data) =>{
      this.recipeS.setRecipes(data)
      console.log("got")
    }))
  }

}
