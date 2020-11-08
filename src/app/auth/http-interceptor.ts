import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class HttpInterceptorServes implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.auth.user.pipe(take(1), exhaustMap(user => {
            if(user===null){
                return next.handle(req)
            }
            const newReq = req.clone({ params: new HttpParams().set('auth', user.token) })
            return next.handle(newReq)
        }))
    }
}