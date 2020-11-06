import { Component } from "@angular/core"
import { AppHttpService } from '../shared/app-http.service';
import { RecipeSService } from '../shared/recipe-s.service';
@Component({
    selector : "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent{
    /*@Output() view = new EventEmitter<string>()
    openView(view:string){
        this.view.emit(view)
    }*/
    constructor(private http:AppHttpService){ }
    
    saveReciep(){
        this.http.storeRecipe()
    }

    fetchData(){
        this.http.fetchRecipe().subscribe()
    }

}