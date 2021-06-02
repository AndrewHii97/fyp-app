import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from'@angular/forms';

import { HousingUnitRoutingModule } from './housing-unit-routing.module';
import { HousingUnitComponent } from './housing-unit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { NewHouseComponent } from './new-house/new-house.component';
import { UpdateHouseComponent } from './update-house/update-house.component';


@NgModule({
  declarations: [
    HousingUnitComponent,
    NewHouseComponent,
    UpdateHouseComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HousingUnitRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class HousingUnitModule { }