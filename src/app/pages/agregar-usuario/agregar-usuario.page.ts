import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  run: number;
  nombre: string;
  correo: string;
  contrasena: string;

  constructor(

  ) { }

  ngOnInit() {
  }

  // guardar() {
  //   this.dblocalservice.saveUsuario(this.run, this.nombre, this.correo, this.contrasena);
  // }

}
