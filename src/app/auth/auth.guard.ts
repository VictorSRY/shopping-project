import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private router:Router,private auth:AuthService){}
    canActivate( route:ActivatedRouteSnapshot, state:RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.auth.user.pipe( take(1), map(user=>{
            if(!!user){
                return  true
            }else{
                return this.router.createUrlTree(['/auth'])
            }
        }),
        /*
        //old re Routing
        tap(user => {
            if(user){
                return true
            }
            return this.router.navigate(['/auth'])
        })
        */
        )
    }
}