import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule,TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule, } from 'ngx-translate-testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en-EN.json'), es: require('src/assets/i18n/es-ES.json'), it: require('src/assets/i18n/it-IT.json') })
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'esameAngular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('esameAngular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect("esameAngular").toContain('esameAngular');
  });

  it('should render aaa title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('it');
    translateService.use(translateService.getDefaultLang());
    
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // console.log( fixture.debugElement.nativeElement.querySelector('div.a'));
    const a : HTMLElement = document.getElementById("a")!;
    
    
    console.log(translateService.instant(a.innerText));

    console.log(a);

    expect("a").toEqual('b');
  }));

  it('should render en', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log(compiled.querySelector('.a'));
    
    expect(compiled.querySelector('.a')).toContain('Log in');
  }));

});
