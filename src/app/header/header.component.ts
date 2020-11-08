import { Component, OnDestroy, OnInit } from "@angular/core"
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppHttpService } from '../shared/app-http.service';
@Component({
    selector : "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit,OnDestroy{

    private userAuthSub=new Subscription()
    public loggedIn:boolean

    constructor(private http:AppHttpService,private userAuth:AuthService ){ }

    ngOnInit(){
        this.userAuthSub=this.userAuth.user.subscribe( (user)=>{
            if(user!==null){
                this.loggedIn=true
            }
        })
    }
    
    saveReciep(){
        this.http.storeRecipe()
    }

    fetchData(){
        this.http.fetchRecipe().subscribe()
    }

    signOut(){
        this.userAuth.signOut()
        console.log("sign Out")
    }

    ngOnDestroy(){
        this.userAuthSub.unsubscribe()
    }

}