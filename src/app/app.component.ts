import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { clienti, dashboard, es, gb, it, login, logout, registrazione } from './actions/app.actions';
import { AuthService } from './auth/auth.service';
import { isLoggedIn, isLoggedOut } from './auth/selectors/auth.selectors';
import { AppState } from './reducers';
import { LoaderService } from './services/loader.service';
import { tema } from './tema/actions/tema.actions';
import { temaselector } from './tema/selectors/tema.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tema$ : Subscription | undefined;

  title = 'esameAngular';
  setMode = false;
  mode = '';

  temastring : string | undefined


  constructor(public translate: TranslateService, private auth: AuthService, private router: Router, private store: Store<AppState>) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.setDefaultLang(event.lang);
    })

    const browserLang = this.translate.getBrowserLang();

    translate.use(browserLang?.match('en-EN' || 'it-IT' || 'es-ES') ? browserLang : 'it-IT');
  }
  
  ngOnInit(): void {
    this.tema$ = this.store.pipe(
      select(temaselector)
    ).subscribe({
      next : (value) => {
        this.temastring = value
      },
    })
  }

  changeSelectLang(lang: string) {
     switch (lang) {
      case "it-IT":
        this.store.dispatch(it({lang}))
        break;
      case "en-EN":
        this.store.dispatch(gb({lang}))
        break;
      case "es-ES":
        this.store.dispatch(es({lang}))
        break;
    } 
  }

  changeMode(mode: string) {
    this.setMode = !this.setMode
    this.store.dispatch(tema({tema :  mode}))
    }



    



}
