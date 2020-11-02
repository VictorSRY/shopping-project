import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingSService {
  ingredients:Ingredient[] = [new Ingredient('apple',4),new Ingredient('grapes',100)]

  updateIngerdients = new EventEmitter<Ingredient[]>()

  constructor() { }

  getIngerdients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.updateIngerdients.emit(this.ingredients.slice())
  }

  addIngredients(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient)
    this.updateIngerdients.emit(this.ingredients.slice())
  }

  removeIngredient(index:number= -1, name:string){
    if (index === -1){
      index = this.ingredientIndexOf(name)      
    }
    this.ingredients.splice(index,1)
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
