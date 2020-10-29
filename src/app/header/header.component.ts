import { componentFactoryName } from '@angular/compiler';
import { Component, EventEmitter, Output } from "@angular/core"
@Component({
    selector : "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent{
    @Output() view = new EventEmitter<string>()
    openView(view:string){
        this.view.emit(view)
    }
}