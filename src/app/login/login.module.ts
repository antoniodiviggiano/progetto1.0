import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from 'src/app/reducers';
import { AppState } from 'src/app/reducers';
import { authReducer } from '../auth/reducers';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/autth.effects';





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
    EffectsModule.forFeature([AuthEffects])
  ]
})

export class LoginModule {
  static forRoot(): ModuleWithProviders<AppState> {
    return {
      ngModule: LoginModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }
} 

