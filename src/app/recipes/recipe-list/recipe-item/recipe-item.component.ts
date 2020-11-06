import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() recipe: Recipe
  @Input() index: number

  constructor(private recipeS: RecipeSService) { }

  ngOnInit(): void {  }

  /* rSelected(){
    this.recipeS.recipeSlected.emit(this.recipe)
  }*/

}
