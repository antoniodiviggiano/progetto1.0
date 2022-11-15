import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Resp } from "../models/IResp";
import { LogInService } from "../services/log-in.service";
import { ModalCustomService } from "../services/modal-custom.service";
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  needsLogin(): any {
    throw new Error("Method not implemented.");
  }
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private router: Router,
    private logInService: LogInService,
    public translate: TranslateService,
    private auth: AuthService,
    private modal : ModalCustomService
  ) { }

  ngOnInit(): void { }

  respComponent: any

  login() {
    this.logInService
      .logIn({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe(
        (resp: Resp) => {
          localStorage.setItem("accessToken", resp.accessToken);
          this.router.navigate(["/cocktail"]);

          const token = localStorage.getItem("accessToken");
          console.log(token);

          if (token !== "") {
            this.auth.isLoggedIn = true;
          }



          console.log(this.respComponent);
          
       
          this.respComponent = resp;
         

        },

        (error: string) => {
          let errorTrad: string = "";
          switch (error) {
            case 'Cannot find user':
              errorTrad = this.translate.instant("GENERALE.UtenteNonTrovato");
              break
            case 'Incorrect password':
              errorTrad = this.translate.instant("GENERALE.PasswordErrata");
              break
            default:
              errorTrad = errorTrad = this.translate.instant("GENERALE.ErroreLogin");
              break
          }
          this.modal.open(errorTrad);
        },
        () => this.router.navigate(["/cocktail"])
      );
  }
}
