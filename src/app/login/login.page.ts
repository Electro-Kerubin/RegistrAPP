import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    usuario: null,
    clave: null,
  };

  hide = true;

  constructor(
    private router: Router,
    private toastController: ToastController
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

  onSubmit(){
    
    if (this.user.usuario == null || this.user.clave == null) {
      this.toastLoginFail();
      this.user = {
        usuario: null,
        clave: null,
      };
      return;
      
    }
    const navegationExtras: NavigationExtras = {
      state: this.user
    };
    this.router.navigate(['/home'], navegationExtras);
    this.toastLoginSuccess()
  }

  // onSubmit() {
  //   const navegationExtras: NavigationExtras = {
  //     state: this.user,
      
  //   };
  //   this.router.navigate(['/home'], navegationExtras);
  //   this.toastLoginSuccess();
  //   console.log(this.user)
  // }

  // nav_restClave(){
  //   this.router.navigate(['/rest-clave']);
  // }

}
