import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage implements OnInit {
  private fecha = null;
  public myAngularxQrCode: string = null;
  qr = {
    asignatura: ''
  };
  

  constructor() {
    //toma la fecha actual y la guarda en una variable
    this.fecha = new Date();
  }
  //crea una variable tomando la asignatura que elegimos y la fecha actual para generar un string que creara un qr en el generar.html
  generar(){
    this.myAngularxQrCode ='Asignatura Registrada: '+this.qr.asignatura + ', Fecha:' + this.fecha;
  }

  ngOnInit() {
  }

}
