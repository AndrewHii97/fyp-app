import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginMessageComponent } from './login-message/login-message.component';
import { LoginErrorDirective } from './login-error.directive';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginMessageComponent,
    LoginErrorDirective
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [LoginErrorDirective]
})
export class LoginModule { }
