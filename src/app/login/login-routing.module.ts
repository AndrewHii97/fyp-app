import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginMessageComponent } from './login-message/login-message.component'

const routes: Routes = [
  { path: '', component: LoginComponent,children:
    [{
      path: 'message', component: LoginMessageComponent
    }]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
