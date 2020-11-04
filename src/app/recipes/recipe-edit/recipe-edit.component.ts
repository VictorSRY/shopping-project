import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  selectedR:Recipe

  constructor(private route:ActivatedRoute,private recipeS:RecipeSService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:Params)=>{
      console.log(param['recipeId'])
      this.selectedR = this.recipeS.getRecipe(+param['recipeId'])
    })
  }
  addToShoppingList(){
    /* this.shoppingS.addIngredients(this.selectedR.ingredients) */
  }

}
