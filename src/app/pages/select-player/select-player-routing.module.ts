import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPlayerPage } from './select-player.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPlayerPageRoutingModule {}
