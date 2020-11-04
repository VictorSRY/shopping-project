import { Component,  OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]
  
  constructor(private recipeS:RecipeSService, private router:Router,private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.recipes = this.recipeS.getRecipes()
  }
  toNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
