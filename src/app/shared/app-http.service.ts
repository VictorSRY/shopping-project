import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeSService } from './recipe-s.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  private userSub: Subscription

  constructor(private http: HttpClient, private recipeS: RecipeSService, private userAuth: AuthService) { }

  storeRecipe() {
    const recipes = this.recipeS.getRecipes()
    this.userAuth.user.pipe(take(1), exhaustMap(user => {
      return this.http.put("https://angular-shoppingapp-project.firebaseio.com/recipe.json", recipes, { params: new HttpParams().set('auth', user.token) })
    }))
      .subscribe(event => {
        console.log("Saved")
      })
  }

  fetchRecipe() {

    return this.http
      .get<Recipe[]>("https://angular-shoppingapp-project.firebaseio.com/recipe.json").pipe(map(data => {
        return data.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
        tap(data => {
          this.recipeS.setRecipes(data)
          console.log("got Recipes")
        })
      )

    /*

    // withOut Interseptor

    return this.userAuth.user.pipe( take(1), exhaustMap(user=>{
      return this.http
    .get<Recipe[]>("https://angular-shoppingapp-project.firebaseio.com/recipe.json",{params: new HttpParams().set("auth",user.token)})
    }),
    map( data => {
      return data.map((recipe)=>{
        return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : [] } 
      })
    }),
    tap( (data) =>{
      this.recipeS.setRecipes(data)
      console.log("got")
    }))*/
  }

}
