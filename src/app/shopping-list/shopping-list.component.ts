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
  
  private subscription:Subscription
  public ingredients:Ingredient[]
  private shoppingSubscription:Subscription
  public index:number
  removeMode:boolean=false
  
  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  ngOnInit(): void {
    // to remove or active "X"
    this.subscription = this.shoppingS.removeMode.subscribe(value=>{
      this.removeMode=value
      console.log(this.removeMode)
    })

    // To get ingredients and live update
    this.ingredients= this.shoppingS.getIngerdients()
    this.shoppingSubscription = this.shoppingS.updateIngerdients.subscribe( (ingredients:Ingredient[]) => {
      this.ingredients=ingredients
    })
  }

  remove(index){
    if(this.removeMode){
      this.shoppingS.removeIngredient(index)
    }
  }

  edit(index){
    this.shoppingS.editMode.next(index)
  }
    ngOnDestroy(){
    this.subscription.unsubscribe()
    this.shoppingSubscription.unsubscribe()
  }
}
