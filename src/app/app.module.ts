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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const getConfig = () => {
  if (isPlatform('ios')) {
    return {
      backButtonText: 'Volver',
      backButtonIcon: "ios-back-arrow",
      pageTransition: 'ios-transition'
    }
  }

  return {
    backButtonText: 'Volver',
      backButtonIcon: "close"
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    Camera,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite,LoginPage,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
