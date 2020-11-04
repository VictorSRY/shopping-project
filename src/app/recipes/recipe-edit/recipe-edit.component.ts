import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { element } from 'protractor';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  selectedR:Recipe
  id:number
  name:string
  description:string
  image:string
  ingredients:Ingredient[]
  @ViewChild('nameInput') iName:ElementRef
  @ViewChild('amountInput') iAmount:ElementRef

  constructor(private route:ActivatedRoute ,private recipeS:RecipeSService ) { }

  ngOnInit(): void {
    console.log(this.route)
    console.log(this.route.snapshot.queryParams['recipeId'])
    this.selectedR = this.recipeS.getRecipe(+this.route.snapshot.queryParams['recipeId'])
    console.log(this.selectedR)
    this.id=this.selectedR.id
    this.name=this.selectedR.name
    this.image=this.selectedR.image
    this.description=this.selectedR.description
    this.ingredients=this.selectedR.ingredients
  }
  addItem(){
    this.ingredients.push(new Ingredient(this.iName.nativeElement.value, this.iAmount.nativeElement.value))
  }
  addToShoppingList(){
    /* this.shoppingS.addIngredients(this.selectedR.ingredients) */
  }
  update(){
    this.recipeS.updateRecipe(this.id,new Recipe(this.id,this.name,this.description,this.image,this.ingredients))
  }
}
