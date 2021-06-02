import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingUnitComponent } from './housing-unit.component';

const routes: Routes = [{ path: '', component: HousingUnitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousingUnitRoutingModule { }
