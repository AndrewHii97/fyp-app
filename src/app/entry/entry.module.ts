import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';


@NgModule({
  declarations: [
    EntryComponent,
    EntryDetailComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EntryRoutingModule
  ]
})
export class EntryModule { }
