import { Component,  OnDestroy,  OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[]
  private recipeSubscription:Subscription

  constructor(private recipeS:RecipeSService, private router:Router,private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.recipes = this.recipeS.getRecipes()
    this.recipeSubscription = this.recipeS.updateRecipes.subscribe(recipes=>{
      this.recipes=recipes
    })
  }
  toNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(){
    this.recipeSubscription.unsubscribe()
  }
}
