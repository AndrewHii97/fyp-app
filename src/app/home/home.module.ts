import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HomeRoutingModule
  ],
  providers:[MaterialModule]
})
export class HomeModule { }
