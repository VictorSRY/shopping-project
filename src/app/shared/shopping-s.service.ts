import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingSService {
  ingredients:Ingredient[] = [new Ingredient('Apple',4),new Ingredient('Grape',100)]

  updateIngerdients = new Subject<Ingredient[]>()
  removeMode=new Subject<boolean>()

  constructor() { }

  getIngerdients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.updateIngerdients.next(this.ingredients.slice())
  }

  addIngredients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient)
    this.updateIngerdients.next(this.ingredients.slice())
  }

  removeIngredient(index?:number){
    console.log("remove ingredient id:",index)
    this.ingredients.splice(index,1)
    this.updateIngerdients.next(this.ingredients.slice())

  }

  updateIngredient(ingredient:Ingredient, index:number){
    if(index===-1){
      index = this.ingredientIndexOf(ingredient.name)
    }
    this.ingredients[index]=ingredient
  }

  ingredientIndexOf(name:string){
    this.ingredients.forEach( (ingredient,index) =>{
      if(ingredient.name===name){
        return index
      }
    })
    return -1
  }
}
