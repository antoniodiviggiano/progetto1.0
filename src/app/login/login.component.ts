import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../auth/auth.service";
import { Resp } from "../models/IResp";
import { LogInService } from "../services/log-in.service";
import { ModalCustomService } from "../services/modal-custom.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
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

  login() {
    this.logInService
      .logIn({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe(
        (resp: Resp) => {
          localStorage.setItem("accessToken", resp.accessToken);
          this.router.navigate(["/dashboard"]);

          const token = localStorage.getItem("accessToken");
          console.log(token);

          if (token !== "") {
            this.auth.isLoggedIn = true;
          }
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

        () => this.router.navigate(["/dashboard"])
      );
  }
}
