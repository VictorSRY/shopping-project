import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') name:ElementRef
  @ViewChild('amountInput') amount:ElementRef
  @Output() item= new EventEmitter<Ingredient>()
  constructor() { }

  ngOnInit(): void {
  }

  additem(){
    const name=this.name.nativeElement.value
    const amount=this.amount.nativeElement.value
    this.item.emit(new Ingredient(name,amount))
  }

}
