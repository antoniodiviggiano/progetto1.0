import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'esameAngular';

  constructor(public translate: TranslateService) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.setDefaultLang(event.lang);
    })

    const browserLang = this.translate.getBrowserLang();

    translate.use(browserLang?.match('en-EN' || 'it-IT' || 'es-ES') ? browserLang : 'it-IT');

  }

}
