import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { AsyncPipe } from '../../../node_modules/@angular/common';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
  ],
  providers: [AsyncPipe]
})
export class AlertModule { }
