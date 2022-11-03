import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../models/IUser';
import { LogInService } from '../services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
  })

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router, private logInService: LogInService) { }

  ngOnInit(): void {
    
  }

  login(){
    this.logInService.logIn().subscribe({
      next: (users) => {
        this.findUser(users);
      },
      error: (err) => console.log(err),
    });
  }

  findUser(users : IUser[]) {
    let userLogged : IUser | undefined = users.find( e => e.email === this.loginForm.value.email && e.password === this.loginForm.value.password)
    
    if(userLogged){
      alert('Bentornato '+userLogged.nomeUtente);
    } else {
      alert('utente non torvato');
    }
  }


}


