import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const approutes:Routes=[
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:'recipe', loadChildren:'../recipes/recipes.module#RecipesModule'}
]

@NgModule({
    imports:[RouterModule.forRoot(approutes)],
    exports:[RouterModule]
})

export class AppRouting { }