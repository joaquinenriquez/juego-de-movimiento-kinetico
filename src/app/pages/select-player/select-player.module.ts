import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPlayerPageRoutingModule } from './select-player-routing.module';

import { SelectPlayerPage } from './select-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPlayerPageRoutingModule
  ],
  declarations: [SelectPlayerPage]
})
export class SelectPlayerPageModule {}
