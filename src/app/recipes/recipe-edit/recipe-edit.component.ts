import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  selectedR: Recipe
  id: number = -1
  name: string = ""
  description: string = ""
  image: string = ""
  ingredients: Ingredient[] = []
  @ViewChild('nameInput') iName: ElementRef
  @ViewChild('amountInput') iAmount: ElementRef
  editMode: boolean = false

  constructor(private route: ActivatedRoute, private recipeS: RecipeSService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.editMode = this.route.snapshot.params['id'] != null
    console.log('editmode:', this.editMode)
    if (this.editMode) {
      this.id = +this.route.snapshot.params['id']
      this.selectedR = this.recipeS.getRecipe(this.id)
      console.log(this.selectedR)
      this.name = this.selectedR.name
      this.image = this.selectedR.image
      this.description = this.selectedR.description
      this.ingredients = this.selectedR.ingredients
    }
  }
  addItem() {
    this.ingredients.push(new Ingredient(this.iName.nativeElement.value, this.iAmount.nativeElement.value))
  }
  addToShoppingList() {
    /* this.shoppingS.addIngredients(this.selectedR.ingredients) */
  }
  updateRecipe() {
    console.log(this.name, this.description)
    this.recipeS.updateRecipe(this.id, new Recipe(this.name, this.description, this.image, this.ingredients))
  }
}
