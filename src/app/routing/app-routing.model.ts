import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeComponent } from '../recipes/no-recipe/no-recipe.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const approutes:Routes=[
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'Shopping-List',component:ShoppingListComponent},
    {path:'shopping-list',redirectTo:'/Shopping-List'},
    {path:'Shopping-list',redirectTo:'/Shopping-List'},
    {path:'shoppinglist',redirectTo:'/Shopping-List'},
    {path:'recipe',component:RecipesComponent,children:[
        {path:'',component:NoRecipeComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/recipe-edit',component:RecipeEditComponent}
    ]},
]

@NgModule({
    imports:[RouterModule.forRoot(approutes)],
    exports:[RouterModule]
})

export class AppRouting{

}