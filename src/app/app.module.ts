import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { InserimentoProdottiComponent } from "./inserimento-prodotti/inserimento-prodotti.component";
import { ErrorCatchingInterceptor } from "./interceptors/error-catching.interceptor";
import { LoginComponent } from "./login/login.component";
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
    MatMenuModule,
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
