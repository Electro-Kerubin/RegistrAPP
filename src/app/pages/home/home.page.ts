import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;
  showFiller = false;

  routerState: any;
  user: string;

  constructor(private router: Router, private activeroute: ActivatedRoute, private camera:Camera) {
    this.activeroute.queryParams.subscribe(
      params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.routerState = this.router.getCurrentNavigation().extras.state;
          localStorage.setItem('user', this.routerState.usuario.split('@')[0]);
        }
      }
    );
  }

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

  ngOnInit(){
    this.user = localStorage.getItem('user');
  }

}
