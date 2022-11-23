import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ErrorCatchingInterceptor } from "./interceptors/error-catching.interceptor";
import { LoginComponent } from "./login/login.component";
import { RegistrazioneComponent } from "./registrazione/registrazione.component";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { InserimentoProdottiComponent } from "./inserimento-prodotti/inserimento-prodotti.component";
import { TabellaprodottiComponent } from "./tabellaprodotti/tabellaprodotti.component";
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';


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
    TabellaprodottiComponent
  ],
  imports: [
    MatMenuModule,
    CdkAccordionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
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
      })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
