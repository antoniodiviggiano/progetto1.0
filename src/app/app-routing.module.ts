import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CocktailComponent } from './cocktail/cocktail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
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
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    //canActivate: [AuthGuard],
  },
  {
    path:"**",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
