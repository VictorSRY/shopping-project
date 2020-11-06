import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { AppHttpService } from '../shared/app-http.service';
import { RecipeSService } from '../shared/recipe-s.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpResolverService implements Resolve<Recipe[]> {

  constructor( private http:AppHttpService, private recipe:RecipeSService ) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipes=this.recipe.getRecipes()
    console.log(route.root.queryParams['id'])
    if(recipes[route.root.queryParams['id']]){
      return recipes
    }
    else{
      return this.http.fetchRecipe()
    }
  }
}
