import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { AppHttpResolverService } from '../routing/app-http-resolver.service';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { SharedModule } from '../shared/shared.module';

const routes:Routes=[
    {path:'',component:RecipesComponent,canActivate:[AuthGuard] ,children:[
        {path:'',component:NoRecipeComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent, resolve:[AppHttpResolverService] },
        {path:':id/recipe-edit',component:RecipeEditComponent, resolve:[AppHttpResolverService] }
    ]}    
]

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        NoRecipeComponent,
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports:[RouterModule]
})
export class RecipesModule{ }