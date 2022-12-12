import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  scannedResult: any

  //Correo de usuario
  userLoginData: string = localStorage.getItem('correo')

  //Data usuario API
  usuarioDataHtml: Usuario;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;
  
  constructor(private barcodeScanner: BarcodeScanner, 
			  private alertController: AlertController, ) { 
    console.log("correo: " + this.userLoginData)
  }

  ngOnInit(): void {
	this.barcodeScanner
		.scan()
		.then((barcodeData) => {
			console.log('Barcode data', barcodeData)
			this.scannedResult = barcodeData.text
			console.log(barcodeData.text)

			// aqui colocar el mailgun

			
		})
		.catch((err) => {
			console.log('Error', err)
		})
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Guardado',
	  subHeader: this.scannedResult ,
      message:  'Correo enviado a: ' + this.usuarioDataHtml.correo ,

      buttons: ['OK'],
    });

    await alert.present();
  }

}
