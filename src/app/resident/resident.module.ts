import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ResidentRoutingModule } from './resident-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ResidentComponent } from './resident.component';
import { EditResidentComponent } from './edit-resident/edit-resident.component';
import { NewResidentComponent } from './new-resident/new-resident.component';
import { PendingResidentComponent } from './pending-resident/pending-resident.component';



@NgModule({
  declarations: [
    ResidentComponent,
    EditResidentComponent,
    NewResidentComponent,
    PendingResidentComponent
  ],
  imports: [
    CommonModule,
    ResidentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResidentModule { }
