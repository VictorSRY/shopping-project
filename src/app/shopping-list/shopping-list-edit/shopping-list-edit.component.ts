import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { ShoppingSService } from 'src/app/shared/shopping-s.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') name:ElementRef
  @ViewChild('amountInput') amount:ElementRef
  
  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  ngOnInit(): void {
  }

  additem(){
    this.shoppingS.addIngredient(new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value))
  }

}
