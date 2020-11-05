import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedR:Recipe

  constructor(private shoppingS:ShoppingSService,private route:ActivatedRoute,private recipeS:RecipeSService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param:Params)=>{
      console.log(param['id'])
      this.selectedR = this.recipeS.getRecipe(+param['id'])
    })
  }
  addToShoppingList(){
    this.shoppingS.addIngredients(this.selectedR.ingredients) 
  }

}
