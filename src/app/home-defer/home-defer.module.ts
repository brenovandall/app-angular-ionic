import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDeferPageRoutingModule } from './home-defer-routing.module';

import { HomeDeferPage } from './home-defer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDeferPageRoutingModule
  ],
  declarations: [HomeDeferPage]
})
export class HomeDeferPageModule {}
