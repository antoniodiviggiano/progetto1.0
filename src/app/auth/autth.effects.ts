import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions) {
        actions$.subscribe((action: any) => {
            if (action.type == "[Login Page] User Login") {
                localStorage.setItem('accessToken', JSON.stringify(action.user['accessToken']));
            } else if (action.type == '[Logout] Logout: ') {
                localStorage.removeItem('accessToken')            
            }
        })
    }

}