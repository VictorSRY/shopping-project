import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAuthDataModel } from './user.auth.model';

export interface SignInResponceData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: string
}

interface SignUpResponceData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<UserAuthDataModel>(null)
  autoLogOutTimer: any = null

  constructor(private http: HttpClient, private router: Router) { }

  autoLogIn() {
    const userData: { eamil: string, id: string, _token: string, _tokenExp: Date } = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      return;
    }

    const loadUser = new UserAuthDataModel(userData.eamil, userData.id, userData._token, userData._tokenExp)
    if (loadUser.token) {
      console.log('auto loged In')
      const expDate = new Date(loadUser.expTime).getTime() - new Date().getTime()
      this.autoLogOut(expDate)
      this.user.next(loadUser)
    }
  }

  autoLogOut(logOutTimer) {
    console.log("auto logout in:", parseInt(String(logOutTimer / 1000 / 60 / 60)), "hr -", parseInt(String((logOutTimer / 1000 / 60) % 60)), "min")
    this.autoLogOutTimer = setTimeout(() => {
      this.signOut()
    }, logOutTimer)
  }

  sighUp(user) {
    return this.http
      .post<SignUpResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBteF_xo_34UzTOdy2yNk3U3FoNAGKg3TI', user)
      .pipe(tap(data => {
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
      }))
  }

  login(user) {
    return this.http.
      post<SignInResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBteF_xo_34UzTOdy2yNk3U3FoNAGKg3TI', user)
      .pipe(tap(data => {
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
      }))
  }

  private handleAuth(email: string, userId: string, token: string, expIn: number) {
    const expDate = new Date(new Date().getTime() + expIn * 1000)
    const user = new UserAuthDataModel(email, userId, token, expDate)
    this.autoLogOut(expIn * 1000)
    this.user.next(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  signOut() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    //localStorage.removeItem('user')
    localStorage.clear()
    if (this.autoLogOutTimer) {
      clearTimeout(this.autoLogOutTimer)
    }
    this.autoLogOutTimer = null
  }

}
