import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarPageRoutingModule } from './generar-routing.module';

import { GenerarPage } from './generar.page';
import { ComponentsModule } from '../../components/components.module';
import { QRCodeModule } from 'angularx-qrcode';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    GenerarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GenerarPage]
})
export class GenerarPageModule {}
