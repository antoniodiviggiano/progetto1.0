import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: "registrazione",
    loadChildren: () => import('./registrazione/registrazione.module').then(m => m.RegistrazioneModule)
  },
  {
    path:"dashboard",
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:"clienti",
    loadChildren: () => import('./clienti/clienti.module').then(m => m.ClientiModule)
  },
  {
    path:"profilo",
    loadChildren: () => import('./profilo/profilo.module').then(m => m.ProfiloModule),
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
