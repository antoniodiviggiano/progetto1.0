import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { IUserResp } from "src/app/models/IUserResp";
import { AppState } from "src/app/reducers";
import { cliente } from "../actions/clienti.actions";

@Injectable()
export class ClientiEffect {
    constructor(private actions$: Actions, private router: Router, public translate: TranslateService, private store: Store<AppState>) {

        actions$.subscribe((action: any) => {
            switch (action.type) {
                case '[Clienti] Click su cliente':
                    let body : IUserResp =  {
                        id: action.id,
                        nomeUtente: action.nomeUtente,
                        password: action.password,
                        email: action.email,
                        dataNascita: action.dataNascita

                    }
                    //this.store.dispatch(cliente(body)) infinity loop

                    break;

            }
        });

    }

}