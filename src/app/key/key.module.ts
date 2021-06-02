import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyRoutingModule } from './key-routing.module';
import { KeyComponent } from './key.component';


@NgModule({
  declarations: [
    KeyComponent
  ],
  imports: [
    CommonModule,
    KeyRoutingModule
  ]
})
export class KeyModule { }
