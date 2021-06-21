import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { KeyRoutingModule } from './key-routing.module';
import { KeyComponent } from './key.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewKeyComponent } from './new-key/new-key.component';
import { EditKeyComponent } from './edit-key/edit-key.component';
import { DeleteKeyAlertComponent } from './delete-key-alert/delete-key-alert.component';


@NgModule({
  declarations: [
    KeyComponent,
    NewKeyComponent,
    EditKeyComponent,
    DeleteKeyAlertComponent
  ],
  imports: [
    CommonModule,
    KeyRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class KeyModule { }
