import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { AsyncPipe } from '../../../node_modules/@angular/common';
import { AlertDetailComponent } from './alert-detail/alert-detail.component';
import { AlertPendingComponent } from './alert-pending/alert-pending.component';



@NgModule({
  declarations: [
    AlertComponent,
    AlertDetailComponent,
    AlertPendingComponent
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
