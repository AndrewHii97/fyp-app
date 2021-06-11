import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { AsyncPipe } from '../../../node_modules/@angular/common';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AlertRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AsyncPipe]
})
export class AlertModule { }
