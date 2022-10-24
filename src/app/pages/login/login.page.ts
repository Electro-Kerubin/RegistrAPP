import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  user = {
    usuario: '',
    clave: ''
  };

  userDataLogin: string;

  //Data API
  userDataApi: Usuario;

  hide = true;


  constructor(
    private router: Router,
    private toastController: ToastController,
    public dblocalservice: DbLocalService,
    public navCtrl: NavController,
    private api: ApiService,
    private storageTest: StorageTestService,
    ) {}
  
  //-------api--------
  
  validarUsuario(correo:string, password:string) {
    
    this.api.getUsuarios().subscribe((data)=>{
      for(let i = 0; i < data.length; i++) {
        if(correo == data[i].correo && password == data[i].contraseña) {
          this.navCtrl.navigateRoot('home');
          localStorage.setItem('guard', 'true');
          this.userDataLogin = correo;
          this.storageTest.addUsuarioCorreoData(correo);
          return console.log("ingresado")
        } else {
          continue
        }
      }
      this.toastLoginFail("Los datos introducidos son incorrectos.")
    });
  }

  getUsuarioFromLogin() {
    return this.userDataLogin;
  }
  

  //-------------------

  ngOnInit() {
    localStorage.setItem('guardLogin', 'false');
    this.storageTest.clearUsuarioCorreoData;
  }
  


  // -------------

  async toastLoginSuccess() {
    const toast = await this.toastController.create({
      message: 'Inicio de sección exitosa.',
      duration: 2000
    });
    toast.present();
  }

  async toastLoginFail(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  // async onSubmit() {

  //    const usuario = await this.dblocalservice.verificarUser(this.user.usuario, this.user.clave);
  //    const infoUsuario = await this.dblocalservice.getUsuario(this.user.usuario, this.user.clave);

  //    if(usuario == true) {
  //      const navegationExtras: NavigationExtras = {
  //        state: this.user,
  //        };
  //       //  this.router.navigate(['/home'], navegationExtras);
  //        this.navCtrl.navigateRoot('home');
  //        this.toastLoginSuccess();
  //        localStorage.setItem('guard', 'true');
  //        localStorage.setItem('user', infoUsuario.primerNombre);
  //        localStorage.setItem('userCorreo', infoUsuario.correo);

  //    } else {
  //      const toast = await this.toastController.create({
  //        message: 'No se pudo iniciar sesión',
  //        duration: 2000
  //      });
  //      toast.present();
  //    }


  // }


}
