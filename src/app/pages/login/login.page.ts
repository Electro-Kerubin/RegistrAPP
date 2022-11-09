import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { DbLocalService } from 'src/app/services/db-local.service';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { StorageTestService } from 'src/app/services/storage-test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // ----- guarda los datos del html ------
  user = {
    usuario: '',
    clave: ''
  };

  // ----- guarda el correo en el storageTestService 
  userDataLogin: string;

  //------- Data API
  userDataApi: Usuario;

  // ----- valor de la casilla que muestra contraseña
  hide = true;


  constructor(
    private router: Router,
    private toastController: ToastController,
    public dblocalservice: DbLocalService,
    public navCtrl: NavController,
    private api: ApiService,
    private storageTest: StorageTestService,
    private db_storage: Storage,
    ) {}

  //-------------------
  ngOnInit() {
    localStorage.setItem('guard', 'false');
    this.storageTest.clearUsuarioCorreoData;

  }
  
  //------- call api --------
  validarUsuario(correo:string, password:string) {
    
    this.api.getUsuarios().subscribe((data)=>{
      for(let i = 0; i < data.length; i++) {
        if(correo == data[i].correo && password == data[i].contraseña) {
          this.navCtrl.navigateRoot('home');
          localStorage.setItem('guard', 'true');
          this.userDataLogin = correo;
          this.db_storage.set('correo', correo);
          this.storageTest.addUsuarioCorreoData(correo);
          return console.log("ingresado")
        } else {
          continue
        }
      }
      this.toastLogin("Los datos introducidos son incorrectos.")
    });
  }

  //-------- toast general ------------
  async toastLogin(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
