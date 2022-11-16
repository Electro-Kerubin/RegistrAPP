import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  image: string;
  showFiller = false;

  // codigo qr
  code: any;

  //Correo de usuario
  userLoginData: string

  //Data usuario API
  usuarioDataHtml: Usuario;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(private router: Router, 
              private barcodeScanner: BarcodeScanner,
              private api: ApiService,
              ) {
                this.userLoginData = localStorage.getItem('correo');
                this.getUsuarioByCorreo(this.userLoginData);
              }
  

  // -------------------------------
  ngOnInit(){
    
  }

  ngOnDestroy(): void {
    this.listObservables.forEach(sub => sub.unsubscribe())
    console.log("homeDestroy")
  }


  //----------- GET API REST USUARIO
  // Get Api Usuario
  async getUsuarioByCorreo(correo){
    const load1$ = this.api.getUsuarios().subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        if(correo == data[i].correo) {
          this.listObservables = [load1$];
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


  //------------------------
  navProfile() {
    this.router.navigate(['home']);
  }

  // ---------- No se que hacen -----------  
  _scan(){
    this.router.navigate(['/escanear']);
  }
  generate(){
    this.router.navigate(['/generar']);
  }
  // ------------------------
}
