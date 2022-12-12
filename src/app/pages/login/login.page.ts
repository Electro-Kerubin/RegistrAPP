import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  // ----- guarda los datos del html ------
  user = {
    usuario: '',
    clave: ''
  };

  // ----- valor de la casilla que muestra contraseña
  hide = true;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private firebase: FirebaseService,
    ) {

    }
  
  //-------------------
  ngOnInit() {
    localStorage.setItem('guard', 'false');
  }
  
  ngOnDestroy(): void {
    console.log("loginDestroy")
    this.listObservables.forEach(sub => sub.unsubscribe())
  }

  async validarUsuario(correo:string, password:string) {
    
    const res = await this.firebase.validateEmailAndPass(correo, password).catch(err => {
      console.log('error')
      this.toastLogin('Datos introducidos son incorrectos.')
    })

    if(res) {
      console.log('si')
      localStorage.setItem('guard', 'true');
      localStorage.setItem('correo', correo)
      this.router.navigate(['/home'])
    }
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
