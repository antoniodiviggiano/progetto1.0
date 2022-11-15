import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import {  TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { RouterTestingModule } from "@angular/router/testing";
import { toString } from "@ng-bootstrap/ng-bootstrap/util/util";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateTestingModule } from "ngx-translate-testing";
import { of } from "rxjs";
import  MockLogin  from "src/app/MockLogin/login.json"

import { LoginComponent } from "./login.component";

fdescribe('LoginComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en-EN.json'), es: require('src/assets/i18n/es-ES.json'), it: require('src/assets/i18n/it-IT.json') })
      ],
      declarations: [
        LoginComponent,
      ],
    }).compileComponents();
  });

 
  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
      expect(component).toBeTruthy();
   });

  it('check email - valida', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    let email = component.loginForm.controls['email'];
    email.setValue('email@gmail.com')
    expect(email.errors).toBeNull()
  })

  it('check email - invalida', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    let email = component.loginForm.controls['email'];
    email.setValue('email')
    expect(email.invalid).toBeTruthy()
  })

  it('check password - valida', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    let password = component.loginForm.controls['password'];
    password.setValue('12345678')
    expect(password.errors).toBeNull()
    expect(password.valid).toBeTruthy()

  })

  it('check password - invalida', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    let password = component.loginForm.controls['password'];
    password.setValue('123')
    expect(password.invalid).toBeTruthy()

  })

  it('check form - senza nessun valore', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('check form - con valori inseriti', ()=> {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    component.loginForm.controls['email'].setValue('email@valida.it')
    component.loginForm.controls['password'].setValue('123456789')
    expect(component.loginForm.valid).toBeTruthy();
  })

  
  fit('check login', () => {

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;


    spyOn(component, 'login').and.callFake(() => {
      return of({
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsImlhdCI6MTY2ODUwNDg5MSwiZXhwIjoxNjY4NTA4NDkxLCJzdWIiOiIyIn0.FGubVVSRwUkHf1907iCtet20PqPeAUUwOHILsZ_x02s",
          "user": {
              "email": "test@test"
          }
      })
    })

    component.login;
    

 
  expect(component.respComponent).toEqual(MockLogin.accessToken)

  });
});


