import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private store : Store<AppState>) {
        actions$.subscribe((action: any) => {
            if (action.type == "[Login Page] User Login") {
                localStorage.setItem('accessToken', JSON.stringify(action.user['accessToken']));
            } else if (action.type == '[Menu bar] Click su logout') {
                localStorage.removeItem('accessToken') 
                
            }
        })
    }

}