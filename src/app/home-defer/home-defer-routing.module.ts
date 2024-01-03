import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDeferPage } from './home-defer.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDeferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDeferPageRoutingModule {}
