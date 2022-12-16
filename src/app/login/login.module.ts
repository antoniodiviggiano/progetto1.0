import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthEffects } from '../auth/effects/autth.effects';
import { authReducer } from '../auth/reducers';
import { LoginRoutingModule } from './login-routing.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    StoreModule.forFeature(
      'auth',
      authReducer
    ),
  ]
})

export class LoginModule {
  static forRoot(): ModuleWithProviders<AppState> {
    return {
      ngModule: LoginModule,
      providers: [
        AuthService,AuthGuard
      ]
    }
  }
} 

