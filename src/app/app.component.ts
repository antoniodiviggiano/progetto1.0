import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'esameAngular';

  login : boolean = false;

  constructor(public translate: TranslateService,private auth : AuthService, private router: Router) {

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
}
