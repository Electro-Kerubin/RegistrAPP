import { Injectable } from '@angular/core';

// Service creado para almacenar la variable correo del formularioLogin para poder reutilizarla en las de mas pages.
@Injectable({
  providedIn: 'root'
})
export class StorageTestService {

  usuarioCorreoData: string;

  constructor() { }

  addUsuarioCorreoData(correo:string) {
    this.usuarioCorreoData = correo;
  }

  getUsuarioCorreoData() {
    return this.usuarioCorreoData;
  }

  clearUsuarioCorreoData(){
    this.usuarioCorreoData = "";
  }
}
