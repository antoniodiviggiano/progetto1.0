import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../models/IUser';
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private logInService: LogInService,public translate: TranslateService) { }

  ngOnInit(): void {
  }

  login() {
    this.logInService.logIn().subscribe({
      next: (users) => {
        this.findUser(users);
      },
      error: (err) => console.log(err),
    });
  }

  findUser(users: IUser[]) {
    let userLogged: IUser | undefined = users.find(e => e.email === this.loginForm.value.email && e.password === this.loginForm.value.password)

    console.log(userLogged);
    

    if (userLogged) {
      alert(this.translate.instant("GENERALE.LoginCompiuto") + userLogged.nomeUtente);
      this.router.navigate(['/cocktail']);
    } else {
      alert(this.translate.instant("GENERALE.LoginFallito"));
      this.loginForm.reset();
    }
  }

}


