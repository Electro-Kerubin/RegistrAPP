import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbLocalService } from 'src/app/services/db-local.service';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


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

  usuario: any;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private api: ApiService,
    private db_local: DbLocalService,
    private storage: Storage,
    ) {
      
      this.api.getUsuarioById(20309502).subscribe((data) => {
        console.log(data.asignaturas) 
        for(let i = 0; i < data.asignaturas.length; i++) {
          console.log(data.asignaturas[i])
        }
      });

      //this.api.getUsuarios().subscribe((data) => this.db_local.guardarDataUsuario(data))
      // this.api.getUsuarioById(20309502).subscribe((data) => console.log(data.correo))

      // Codigo util
      // this.api.getUsuarioById(20309502).subscribe((data) => {
      //   for(let i = 0; i < data.asignaturas.length; i++) {
      //     if(data.asignaturas[i].id == "lenguaje") {
      //       console.log("este es")
      //       console.log(data.asignaturas[i].asistenciaAlumno)
      //     }
      //     // console.log(data.asignaturas[i])
      //   }
      // });
      
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
          localStorage.setItem('guard', 'true');
          localStorage.setItem('correo', correo);
          localStorage.setItem('run', data[i].id)
          // this.api.getUsuarioById(data[i].id).subscribe((data) => this.db_local.guardarDataUsuario(data))
          this.userDataLogin = correo;
          let navigationExtras: NavigationExtras = {
            state: {
              userDataLogin: { userDataLogin: this.userDataLogin }
            }
          }
          load1$.unsubscribe()
          return this.router.navigate(['/home'], navigationExtras);
        } else {
          continue
        }
      }
      load1$.unsubscribe()
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
