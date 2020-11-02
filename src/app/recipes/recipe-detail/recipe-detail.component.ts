import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() selectedR:Recipe

  constructor(private shoppingS:ShoppingSService) { }

  ngOnInit(): void {
  }
  addToShoppingList(){
    this.shoppingS.addIngredients(this.selectedR.ingredients)
  }

}
