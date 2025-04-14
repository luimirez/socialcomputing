import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdCreationPage } from './ad-creation.page';

const routes: Routes = [
  {
    path: '',
    component: AdCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdCreationPageRoutingModule {}
