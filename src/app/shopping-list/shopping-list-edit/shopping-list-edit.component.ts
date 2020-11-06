import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  /*@ViewChild('nameInput')*/ name:string
  /*@ViewChild('amountInput')*/ amount:number
  @ViewChild('ingredientsForm') ingredientsForm:NgForm
  removeMode=false
  editId:number=null
  editIngredient:Ingredient
  subscription:Subscription

  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  ngOnInit(): void {
    this.subscription = this.shoppingS.editMode.subscribe(id=>{
      this.editId=id
      this.editIngredient=this.shoppingS.getIngerdient(id)
      this.ingredientsForm.setValue({
        "name": this.editIngredient.name,
        "amount":this.editIngredient.amount
      })
    })
  }

  additem(){
    this.name=this.ingredientsForm.value.name
    this.amount=+this.ingredientsForm.value.amount
    this.shoppingS.addIngredient(new Ingredient(this.name,this.amount))
    this.ingredientsForm.reset()
  }
  
  reSet(){
    this.ingredientsForm.reset()
    this.editId=null
  }
  
  edit(){
    this.removeMode=!this.removeMode
    this.shoppingS.removeMode.next(this.removeMode)
  }

  update(){
    this.editIngredient = new Ingredient(this.ingredientsForm.value.name,this.ingredientsForm.value.amount)
    this.shoppingS.updateIngredient(this.editId,this.editIngredient)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
