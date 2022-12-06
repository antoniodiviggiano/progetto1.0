import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrazioneRoutingModule } from './registrazione-routing.module';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, registrazioneReducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { RegistrazioneEffect } from './effects/registrazione.effect';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegistrazioneRoutingModule,
    StoreModule.forFeature( authFeatureKey,registrazioneReducer),
    EffectsModule.forFeature([RegistrazioneEffect])
  ]
})
export class RegistrazioneModule { }
