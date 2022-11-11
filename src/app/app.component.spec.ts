import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';


fdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en-EN.json'), es: require('src/assets/i18n/es-ES.json'), it: require('src/assets/i18n/it-IT.json') })
      ],
      declarations: [
        AppComponent
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

  it('should render italian title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('it');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a.accedi').text).toContain('Accedi');
  }));

  it('should render spanish title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('es');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a.accedi').text).toContain('Iniciar sesión');
  }));

  it('should render english title', inject([TranslateService], (translateService: TranslateService) => {
    translateService.setDefaultLang('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a.accedi').text).toContain('Log in');
  }));

});
