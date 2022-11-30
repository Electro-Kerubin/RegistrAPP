import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ApiService } from 'src/app/services/api.service';
import { StorageTestService } from 'src/app/services/storage-test.service';


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
  
  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController, private api: ApiService) { 
	this.getUsuarioByCorreo(this.userLoginData)
    console.log("correo: " + this.userLoginData)
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

  ngOnInit(): void {
		this.barcodeScanner
			.scan()
			.then((barcodeData) => {
				console.log('Barcode data', barcodeData)
				this.scannedResult = barcodeData.text
				console.log(barcodeData.text)
			})
			.catch((err) => {
				console.log('Error', err)
			})
	}
	getUsuarioByCorreo(correo){
		const load1$ = this.api.getUsuarios().subscribe((data) => {
		  for(let i = 0; i < data.length; i++){
			if(correo == data[i].correo) {
			  this.listObservables = [load1$];
			  this.usuarioDataHtml = data[i]      
		  }     
			else {
			  continue
			}
		  }
		});
	  }

	

}
