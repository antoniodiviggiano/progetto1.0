import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { clienti, dashboard, es, gb, it, login, logout, registrazione } from './actions/app.actions';
import { AuthService } from './auth/auth.service';
import { AppState } from './reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'esameAngular';

  login: boolean = false;

  constructor(public translate: TranslateService, private auth: AuthService, private router: Router, private store: Store<AppState>) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.setDefaultLang(event.lang);
    })

    const browserLang = this.translate.getBrowserLang();

    translate.use(browserLang?.match('en-EN' || 'it-IT' || 'es-ES') ? browserLang : 'it-IT');
  }
  ngOnInit(): void {
    this.auth.login$.subscribe(
      resp => this.login = resp
    );
  }

  onlogout() {
    this.auth.logout()
  }

  navigateTo(value: string) {
    if (value === 'login') {
      this.router.navigate(['/login']);
    } else if (value === 'signin') {
      this.router.navigate(['/registrazione']);
    }
  }

  menuBar(type: string) {
    switch (type) {
      case "login":
        this.store.dispatch(login())
        break;
      case "registrazione":
        this.store.dispatch(registrazione())
        break;
      case "clienti":
        this.store.dispatch(clienti())
        break;
      case "dashboard":
        this.store.dispatch(dashboard())
        break;
      case "logout":
        this.store.dispatch(logout())
        break;
    }
  }

  changeSelectLang(lang: string) {
     switch (lang) {
      case "it-IT":
        this.store.dispatch(it(lang))
        break;
      case "en-EN":
        this.store.dispatch(gb(lang))
        break;
      case "es-ES":
        this.store.dispatch(es(lang))
        break;
    } 
  }


}
