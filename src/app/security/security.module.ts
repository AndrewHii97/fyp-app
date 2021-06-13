import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SecurityNewComponent } from './security-new/security-new.component';
import { SecurityUpdateComponent } from './security-update/security-update.component';
import { MaterialModule } from '../material-module';
import { EditImageComponent } from './edit-image/edit-image.component';


@NgModule({
  declarations: [
    SecurityComponent,
    SecurityNewComponent,
    SecurityUpdateComponent,
    EditImageComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SecurityModule { }
