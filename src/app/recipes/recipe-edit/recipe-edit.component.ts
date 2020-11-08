import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeSService } from 'src/app/shared/recipe-s.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup
  selectedR: Recipe

  id: number = -1
  name: string = ""
  description: string = ""
  image: string = ""
  ingredients = new FormArray([])
  iName: string = ""
  iAmount: string = ""
  editMode: boolean = false

  constructor(private route: ActivatedRoute, private recipeS: RecipeSService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.editMode = this.route.snapshot.params['id'] != null
    console.log('editmode:', this.editMode)

    if (this.editMode) {
      this.id = +this.route.snapshot.params['id']
      this.selectedR = this.recipeS.getRecipe(this.id)
      console.log(this.selectedR)
      this.name = this.selectedR.name
      this.image = this.selectedR.image
      this.description = this.selectedR.description

      this.selectedR.ingredients.forEach(ingredient => {
        
        this.ingredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))

      })
      
    }

    this.initForm()
  }

  addItem() {
    this.ingredients.push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  updateRecipe() {
    console.log(this.name, this.description)
    //this.recipeS.updateRecipe(this.id, new Recipe(this.name, this.description, this.image, this.ingredients))
    this.recipeS.updateRecipe(this.id, this.recipeForm.value)
    this.router.navigate(['../'], { relativeTo: this.route , queryParamsHandling:"preserve"})
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'image': new FormControl(this.image, Validators.required),
      'name': new FormControl(this.name, Validators.required),
      'description': new FormControl(this.description, Validators.required),
      'ingredients': this.ingredients
    })
  }

  remove(index) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
