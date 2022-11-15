import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { RouterTestingModule } from "@angular/router/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG } from "@ngx-translate/core";
import { TranslateTestingModule } from "ngx-translate-testing";
import { AppComponent } from "../app.component";
import { AuthService } from "../auth/auth.service";
import { RegistrazioneComponent } from "../registrazione/registrazione.component";

import { LoginComponent } from "./login.component";
/* 
const loginServiceStub = {
  logIn(data: { email: string; password: string }) {
    const user = {
      password: "123456789",
      email: "test@test",
    };
    return user;
  },
};  */

describe('LoginComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [RegistrazioneComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        MatIconModule,
        ReactiveFormsModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en-EN.json'), es: require('src/assets/i18n/es-ES.json'), it: require('src/assets/i18n/it-IT.json') })
      ],
    })
      .compileComponents();
  });

  

  fit('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('email check - utente non valido', ()=> {
    
  })



});
