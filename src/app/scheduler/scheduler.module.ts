import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DayPilotModule } from 'daypilot-pro-angular';
import { SchedulerComponent } from './scheduler.component';

@NgModule ({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    SchedulerComponent
  ],
  exports:      [ SchedulerComponent ],
  providers:    [  ]
})
export class SchedulerModule { }