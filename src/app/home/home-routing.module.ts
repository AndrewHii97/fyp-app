import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'dashboard', loadChildren:() => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
    { path: 'alert', loadChildren: () => import('../alert/alert.module').then(m => m.AlertModule) },
    { path: 'resident', loadChildren: () => import('../resident/resident.module').then(m => m.ResidentModule) }
  ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
