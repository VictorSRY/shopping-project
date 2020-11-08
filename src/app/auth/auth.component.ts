import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true
  loading: boolean = false

  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  switchMode() {
    this.loginMode = !this.loginMode
  }

  submit(form: NgForm) {
    
    if (!form.valid) {
      return
    }

    this.loading = true
    let connetion:Observable<any>

    if (this.loginMode) {
      console.log("login")
      connetion = this.auth.login({ email: form.value.email, password: form.value.password, returnSecureToken: true })
    } else {
      console.log("signup")
      connetion = this.auth.sighUp({ email: form.value.email, password: form.value.password, returnSecureToken: true })
    }

    connetion.subscribe(response => {
      this.loading = false
      //console.log(response)
      this.router.navigate(['./recipe'])
    }, error => {
      this.loading = false
      console.log(console.error)

    })

    form.reset()
  }

}
