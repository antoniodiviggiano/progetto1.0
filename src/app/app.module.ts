import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { isDevMode, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthEffects } from './auth/effects/autth.effects';
import { ClientiComponent } from './clienti/clienti.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppEffect } from './effects/app.effects';
import { HomeComponent } from "./home/home.component";
import { InserimentoProdottiComponent } from "./inserimento-prodotti/inserimento-prodotti.component";
import { ErrorCatchingInterceptor } from "./interceptors/error-catching.interceptor";
import { LoginComponent } from "./login/login.component";
import { reducers } from './reducers';
import { RegistrazioneComponent } from "./registrazione/registrazione.component";
import { TabellaprodottiComponent } from "./tabellaprodotti/tabellaprodotti.component";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrazioneComponent,
    DashboardComponent,
    InserimentoProdottiComponent,
    TabellaprodottiComponent,
    ClientiComponent
  ],
  imports: [
  MatMenuModule,
    CdkAccordionModule,
    BrowserModule,
    MatCheckboxModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AppEffect,AuthEffects])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
