import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbLocalService } from 'src/app/services/db-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    ) { }



  ngOnInit() {
  }
  

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

  onSubmit() {
  const navegationExtras: NavigationExtras = {
  state: this.user,
      
  };
  this.router.navigate(['/home'], navegationExtras);
  this.toastLoginSuccess();
  console.log(this.user)
  }

  nav_restClave(){
  this.router.navigate(['/rest-clave']);
  }


}
