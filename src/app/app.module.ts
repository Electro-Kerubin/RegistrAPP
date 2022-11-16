import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';
import {Camera} from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { IonicStorageModule } from '@ionic/storage-angular';

import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoginPage } from './pages/login/login.page';
import { QRCodeModule } from 'angularx-qrcode';

const getConfig = () => {
  if (isPlatform('ios')) {
    return {
      backButtonText: 'Volver',
      backButtonIcon: "ios-back-arrow",
      pageTransition: 'ios-transition',
    }
  }

  return {
    backButtonText: 'Volver',
      backButtonIcon: "close",
      pageTransition: 'ios-transition',
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    QRCodeModule,
    BrowserModule, 
    IonicModule.forRoot(getConfig()),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    Camera,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite,LoginPage
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
