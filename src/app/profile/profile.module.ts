import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';


import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent, UploadFileDialog } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UploadFileDialog
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
