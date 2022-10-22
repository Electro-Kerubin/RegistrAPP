import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { StorageTestService } from 'src/app/services/storage-test.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;
  showFiller = false;

  routerState: any;
  user = {
    nom: ''
  }

  // codigo qr
  code: any;

  //Correo de usuario
  userLoginData: string = this.storageTest.getUsuarioCorreoData();

  //Data usuario API
  usuarioDataHtml: any;

  constructor(private router: Router, 
              private activeroute: ActivatedRoute,
              private camera:Camera, 
              private barcodeScanner: BarcodeScanner,
              private api: ApiService,
              private storageTest:StorageTestService,
              ) {
    this.activeroute.queryParams.subscribe(
      params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.routerState = this.router.getCurrentNavigation().extras.state;
          localStorage.setItem('user', this.routerState.usuario.split('@')[0]);
        }
      }
    );
  }

  //----------- GET API REST USUARIO

  // Get Api Usuario
  getUsuarioByCorreo(correo){
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
  

  //----------- Rodrigo Scan ---------//
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  //------- el otro scan --------//
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
    });
  }

  async ngOnInit(){
    this.getUsuarioByCorreo(this.userLoginData)
    this.user.nom = await localStorage.getItem('user');
  }

}
