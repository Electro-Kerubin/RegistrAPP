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
    // ---- inicializa el localstorage*
    this.init();
  }

  async guardarDataUsuario(data: Usuario) {
    this.usuario.unshift(data)
    this._storage.set('usuario', this.usuario)
  }

  // ---- inicializa el localstorage*
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // ----- verifica la existencia del usuario mediante el correo en el localstorage
  async getUsuario(correo: string):Promise<Usuario> {
    const users = await this.storage.get('usuario')
    for(let i = 0; i < users.length; i++) {
      if(correo == users[i].correo) {
        return users[i]
      }
    }
  }

  // ----- Verifica si los datos introducidos en el login son correctos.
  async verificarUser(correo: string, pass: string):Promise<boolean> {
    const users = await this.storage.get('usuario')
    for(let i = 0; i < users.length; i++){

      if(correo == users[i].correo){

        if(pass == users[i].contrasena) {
          return true

        } else {
          return false
        }

      } else {
        continue
      }
    }
    return false
  }

  // --------------- Guarda usuarios en el localstorage con la pagina 'agregar-usuario' ------------
  // saveUsuario(run: string, nombre: string, correo: string, contrasena: string) {
  //   const existe = this.usuario.find(c => c.run == run);
  //   if(!existe) {
  //     this.usuario.unshift({run: run, primerNombre: nombre, correo: correo, contraseña: contrasena})
  //     this._storage.set('usuario', this.usuario);
  //     this.presentToast("usuario agregado con exito!!")
  //   } else {
  //     this.presentToast("error: usuario ya existe!!!")
  //   }
  // }

  // ----------- PresentToast -------------
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
