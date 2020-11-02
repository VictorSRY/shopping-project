import { Component } from '@angular/core';
import { RecipeSService } from './shared/recipe-s.service';
import { ShoppingSService } from './shared/shopping-s.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ShoppingSService , RecipeSService ]
})
export class AppComponent {
  viewMode='recipe'

  constructor(private shoppingS:ShoppingSService,private recipeS:RecipeSService){ }

  setview(view:string){
    this.viewMode=view
  }
}
