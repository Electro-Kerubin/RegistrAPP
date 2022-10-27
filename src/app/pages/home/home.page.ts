import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ApiService } from 'src/app/services/api.service';
import { StorageTestService } from 'src/app/services/storage-test.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;
  showFiller = false;

  // codigo qr
  code: any;

  //Correo de usuario
  userLoginData: string;

  //Data usuario API
  usuarioDataHtml: Usuario;

  constructor(private router: Router, 
              private activeroute: ActivatedRoute,
              private camera:Camera, 
              private barcodeScanner: BarcodeScanner,
              private api: ApiService,
              private storageTest:StorageTestService,
              ) {
  }

  //----------- GET API REST USUARIO
  // Get Api Usuario
  async getUsuarioByCorreo(correo){
    this.api.getUsuarios().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        if(correo == data[i].correo) {
          return this.usuarioDataHtml = data[i]
        } else {
          continue
        }
      }
    });
  }
  
  //----------- Scanner QR ---------//
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async ngOnInit(){
    this.userLoginData = await this.storageTest.getUsuarioCorreoData();
    this.getUsuarioByCorreo(this.userLoginData);
  }

}
