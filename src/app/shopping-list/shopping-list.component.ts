import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [new Ingredient('apple',4),new Ingredient('grapes',100)]
  constructor() { }

  ngOnInit(): void {
  }

  addItem(item:Ingredient){
    this.ingredients.push(item)
  }

}
