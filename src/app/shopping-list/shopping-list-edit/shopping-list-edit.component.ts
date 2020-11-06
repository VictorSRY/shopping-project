import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  /*@ViewChild('nameInput')*/ name:string
  /*@ViewChild('amountInput')*/ amount:number
  @ViewChild('ingredientsForm') ingredientsForm:NgForm
  removeMode=false

  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  ngOnInit(): void {
  }

  additem(){
    this.name=this.ingredientsForm.value.name
    this.amount=+this.ingredientsForm.value.amount
    this.shoppingS.addIngredient(new Ingredient(this.name,this.amount))
    this.ingredientsForm.reset()
  }
  reSet(){
    this.ingredientsForm.reset()
  }
  remove(){
    this.removeMode=!this.removeMode
    this.shoppingS.removeMode.next(this.removeMode)
  }

}
