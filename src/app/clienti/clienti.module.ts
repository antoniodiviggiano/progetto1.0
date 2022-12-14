import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientiRoutingModule } from './clienti-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { idProdottiFeatureKey, prodottiFeatureKey, prodottiIdReducer, prodottiReducer, userClickFeatureKey, userFeatureKey, userIdProdottiReducer, userReducer } from './reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientiRoutingModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature( userFeatureKey,userReducer,),
    StoreModule.forFeature( userClickFeatureKey,userIdProdottiReducer,),
    StoreModule.forFeature( idProdottiFeatureKey,prodottiIdReducer,),
    StoreModule.forFeature( prodottiFeatureKey,prodottiReducer,),
    
  ]
})
export class ClientiModule { }
