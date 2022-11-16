import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbLocalService } from 'src/app/services/db-local.service';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';

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

  // ----- guarda el correo en el storageTestService 
  userDataLogin: string;

  //------- Data API
  userDataApi: Usuario;

  // ----- valor de la casilla que muestra contraseña
  hide = true;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private api: ApiService,
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

  //------- call api --------
  validarUsuario(correo:string, password:string) {
    
    const load1$ = this.api.getUsuarios().subscribe((data)=>{
      for(let i = 0; i < data.length; i++) {
        if(correo == data[i].correo && password == data[i].contraseña) {
          this.listObservables = [load1$];
          localStorage.setItem('guard', 'true');
          localStorage.setItem('correo', correo);
          //this.db_storage.set('correo', correo);
          this.userDataLogin = correo;
          let navigationExtras: NavigationExtras = {
            state: {
              userDataLogin: { userDataLogin: this.userDataLogin }
            }
          }

          return this.router.navigate(['/home'], navigationExtras);
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
