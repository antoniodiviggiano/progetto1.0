import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let translateService: TranslateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        //TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en-EN.json'), es: require('src/assets/i18n/es-ES.json'), it: require('src/assets/i18n/it-IT.json') })
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        TranslateService,
        TranslatePipe
      ]
    }).compileComponents();
    translateService = TestBed.inject(TranslateService);
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

  it('should render it',  async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    
    translateService.setTranslation('it', { GENERALE : {Accedi : 'Accedi' }});
    translateService.use('it');
    
    fixture.detectChanges();
    expect(compiled.querySelector('#divProva').innerText).toEqual('Accedi');
  }));

  it('should render en',  async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    
    translateService.setTranslation('en', { GENERALE : {Accedi : 'Log in' }});
    translateService.use('en');
    
    fixture.detectChanges();
    expect(compiled.querySelector('#divProva').innerText).toEqual('Log in');
  }));

});
