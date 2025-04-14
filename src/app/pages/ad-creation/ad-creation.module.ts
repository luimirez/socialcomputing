import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdCreationPageRoutingModule } from './ad-creation-routing.module';

import { AdCreationPage } from './ad-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdCreationPageRoutingModule
  ],
})
export class AdCreationPageModule {}
