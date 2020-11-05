import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeSService } from '../shared/recipe-s.service';
import { ShoppingSService } from '../shared/shopping-s.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  public ingredients:Ingredient[]
  private shoppingSubscription:Subscription
  
  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  ngOnInit(): void {
    this.ingredients= this.shoppingS.getIngerdients()
    this.shoppingSubscription = this.shoppingS.updateIngerdients.subscribe( (ingredients:Ingredient[]) => {
      this.ingredients=ingredients
    })
  }
  ngOnDestroy(){
    this.shoppingSubscription.unsubscribe()
  }
}
