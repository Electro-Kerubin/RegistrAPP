import { Injectable } from '@angular/core';

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
