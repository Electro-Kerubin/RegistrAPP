import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  //Correo de usuario
  userLoginData: string = localStorage.getItem('correo')

  //Data usuario API
  usuarioDataHtml: Usuario;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(
    private api: ApiService,
    private firebase: FirebaseService,
    ) {
        // this.getUsuarioByCorreo(this.userLoginData)
        console.log("correo: " + this.userLoginData)
        this.getData()
      }

  ngOnDestroy(): void {
    this.listObservables.forEach(sub => sub.unsubscribe())
    console.log("profileDestroy")
  }

  // ------------------------
  ngOnInit(){
    
 }


 getData() {
  const load1$ = this.firebase.getDataByEmail(localStorage.getItem('correo')).subscribe((res) => {
     this.usuarioDataHtml = res[0]
     this.listObservables = [load1$]
     console.log(res[0])
  })
}

  // Get Api Usuario
  //  getUsuarioByCorreo(correo){
  //    const load1$ = this.api.getUsuarios().subscribe((data) => {
  //      for(let i = 0; i < data.length; i++){
  //        if(correo == data[i].correo) {
  //          this.listObservables = [load1$];
  //          this.usuarioDataHtml = data[i]      
  //      }     
  //        else {
  //          continue
  //        }
  //      }
  //    });
  //  }

}