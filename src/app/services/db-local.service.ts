import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DbLocalService {

  usuario: Usuario[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getUsuarios() {
    const usuarioExiste = await this.storage.get('usuario');
    if(usuarioExiste) {
      this.usuario = usuarioExiste;
    }
  }

  saveUsuario(run: number, nombre: string, correo: string, contrasena: string) {
    const existe = this.usuario.find(c => c.run == run);
    if(!existe) {
      this.usuario.unshift({run: run, nombre: nombre, correo: correo, contrasena: contrasena})
      this._storage.set('usuario', this.usuario);
      this.presentToast("usuario agregado con exito!!")
    } else {
      this.presentToast("error: usuario ya existe!!!")
    }
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}