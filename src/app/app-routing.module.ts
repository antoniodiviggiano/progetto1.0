import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './cocktail/cocktail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"cocktail",
    component:CocktailComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"registrazione",
    component:RegistrazioneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
