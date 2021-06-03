import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

import { ResidentRoutingModule } from './resident-routing.module';
import { ResidentComponent } from './resident.component';


@NgModule({
  declarations: [
    ResidentComponent
  ],
  imports: [
    CommonModule,
    ResidentRoutingModule,
    MaterialModule
  ]
})
export class ResidentModule { }
