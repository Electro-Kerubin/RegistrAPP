import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { DbLocalService } from 'src/app/services/db-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  listUsuarios = [];

  run: number;
  nombre: string;
  correo: string;
  contrasena: string;

  user = {
    usuario: '',
    clave: ''
  };

  hide = true;


  constructor(
    private router: Router,
    private toastController: ToastController,
    public dblocalservice: DbLocalService,
    public navCtrl: NavController,
    ) {

     }


  ngOnInit() {
    localStorage.setItem('guardLogin', 'false');
  }
  


  // -------------

  async toastLoginSuccess() {
    const toast = await this.toastController.create({
      message: 'Inicio de sección exitosa.',
      duration: 2000
    });
    toast.present();
  }

  async toastLoginFail() {
    const toast = await this.toastController.create({
      message: 'Ingrese corectamente sus datos',
      duration: 2000
    });
    toast.present();
  }

  async onSubmit() {



     const usuario = await this.dblocalservice.verificarUser(this.user.usuario, this.user.clave);
     const infoUsuario = await this.dblocalservice.getUsuario(this.user.usuario, this.user.clave);

     if(usuario == true) {
       const navegationExtras: NavigationExtras = {
         state: this.user,
         };
        //  this.router.navigate(['/home'], navegationExtras);
         this.navCtrl.navigateRoot('home');
         this.toastLoginSuccess();
         localStorage.setItem('guard', 'true');
         localStorage.setItem('user', infoUsuario.nombre);
         localStorage.setItem('userCorreo', infoUsuario.correo);

     } else {
       const toast = await this.toastController.create({
         message: 'No se pudo iniciar sesión',
         duration: 2000
       });
       toast.present();
     }


  }

  nav_restClave(){
  
  }


}
