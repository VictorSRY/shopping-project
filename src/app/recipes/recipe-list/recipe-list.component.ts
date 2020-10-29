import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [ new Recipe('iLu', "i l U", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg"),new Recipe('iLu2', "i l U 2", "https://i.ytimg.com/vi/vNhVFle8yLg/maxresdefault.jpg") ]
  
  @Output() pasSelect = new EventEmitter<Recipe>()
  
  constructor() { }

  ngOnInit(): void {
  }
  pasSelected(recipe){
    this.pasSelect.emit(recipe)
  }

}
