import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { authReducer } from './auth/reducers';
import { usersReducer } from './clienti-porodotti/reducers';
import { ClientiComponent } from './clienti/clienti.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppEffect } from './effects/app.effects';
import { HomeComponent } from "./home/home.component";
import { InserimentoProdottiComponent } from "./inserimento-prodotti/inserimento-prodotti.component";
import { ErrorCatchingInterceptor } from "./interceptors/error-catching.interceptor";
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from "./login/login.component";
import { MenubarComponent } from './menubar/menubar.component';
import { ProfiloComponent } from './profilo/profilo.component';
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
    ClientiComponent,
    MenubarComponent,
    ProfiloComponent,
    LoaderComponent,
  ],
  imports: [
  MatMenuModule,
  DragDropModule,
    CdkAccordionModule,
    MatProgressSpinnerModule,
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
    EffectsModule.forRoot([AppEffect,AuthEffects]),
    StoreModule.forFeature(
      'auth',
      authReducer
    ),
    StoreModule.forFeature(
      'users',
      usersReducer
    ),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
 },],
  bootstrap: [AppComponent]
})

export class AppModule { }
