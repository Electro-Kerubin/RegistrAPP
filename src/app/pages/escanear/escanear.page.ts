import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  
  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController,
    private firebase: FirebaseService, private http:HttpClient) { 
		console.log("correo: " + this.userLoginData)
        this.getData()
  }

  async guardar(scannedResult) {
	const email = this.usuarioDataHtml.correo;
	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	this.http.post('https://formspree.io/f/mdojqjey',
        { name: 'Clase registrada', replyto: this.usuarioDataHtml.correo, message: this.scannedResult },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
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
	getData() {
		const load1$ = this.firebase.getDataByEmail(localStorage.getItem('correo')).subscribe((res) => {
		   this.usuarioDataHtml = res[0]
		   this.listObservables = [load1$]
		   console.log(res[0])
		})
	
	}
	

}
