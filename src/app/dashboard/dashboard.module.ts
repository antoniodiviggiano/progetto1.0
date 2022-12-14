import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { visualizzaFeatureKey, prodottiReducer } from '../tabellaprodotti/reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature(
      visualizzaFeatureKey,
      prodottiReducer
    )
  ]
})
export class DashboardModule { }
