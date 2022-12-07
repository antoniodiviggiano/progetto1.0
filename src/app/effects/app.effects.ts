import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class AppEffect {
    constructor(private actions$: Actions, private router: Router, public translate: TranslateService) {

        actions$.subscribe((action: any) => {
            switch (action.type) {
                case '[Menu bar] Click su accedi':
                    this.router.navigateByUrl('/login');
                    break;
                case '[Menu bar] Click su registrazione':
                    this.router.navigateByUrl('/registrazione');
                    break;
                case '[Menu bar] Click su dashboard':
                    this.router.navigateByUrl('/dashboard');
                    break;
                case '[Menu bar] Click su clienti':
                    this.router.navigateByUrl('/clienti');
                    break;
                case '[Select traduzione] Click su IT':
                    translate.use(action.lang)
                    break;
                case '[Select traduzione] Click su GB':
                    translate.use('en-EN')
                    break;
                case '[Select traduzione] Click su ES':
                    translate.use('es-ES')
                    break;
            }
        });

    }

}