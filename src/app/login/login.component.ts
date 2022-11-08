import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Resp } from '../models/IResp';
import { LogInService } from '../services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(private router: Router, private logInService: LogInService,public translate: TranslateService) { }

  ngOnInit(): void {
  }

  login() {
    this.logInService.logIn({"email" : this.loginForm.value.email!, "password" : this.loginForm.value.password!}).subscribe((resp : Resp )=>{
      
      //console.log(resp);
      localStorage.setItem('accessToken',resp.accessToken);
      this.router.navigate(["/cocktail"]);


  
    if (resp.user) {
      alert(this.translate.instant("GENERALE.LoginCompiuto") + resp.user.nomeUtente);
      this.router.navigate(['/cocktail']);
    } else {
      alert(this.translate.instant("GENERALE.LoginFallito"));
      this.loginForm.reset();
    }
  })}
}
