import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";

@Injectable()
export class RegistrazioneEffect {
    constructor(private actions$: Actions, private router: Router) {

        actions$.subscribe((action: any) => {
            if (action.type === '[Pagina registrazione] Click su registrazione') {
                //localStorage.setItem('accessToken', JSON.stringify(action["accessToken"]));
                this.router.navigateByUrl('/login');
            }
        });

    }

}