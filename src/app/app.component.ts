import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'esameAngular';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('it');

    const browserLang = translate.getBrowserLang();
  }
}
