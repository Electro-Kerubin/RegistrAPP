import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';
//import { LoginPage } from '../login/login.page'; 


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

  code: any;

  constructor(private router: Router, 
              private activeroute: ActivatedRoute,
              private camera:Camera, 
              private barcodeScanner: BarcodeScanner,
              private storage: Storage, 
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

  //----------- 

  
  

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
    // console.log(this.loginFun.saveUser());
    this.user.nom = await localStorage.getItem('user');
  }

}
