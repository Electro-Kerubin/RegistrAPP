import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  image: string;
  showFiller = false;

  //Data usuario API
  usuarioDataHtml: Usuario;

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(private router: Router, 
              private firebase: FirebaseService,
              ) {
                this.getData()
              }
              
  // -------------------------------
  ngOnInit(){
    
  }

  ngOnDestroy(): void {
    this.listObservables.forEach(sub => sub.unsubscribe())
    console.log("homeDestroy")
  }

   getData() {
     const load1$ = this.firebase.getDataByEmail(localStorage.getItem('correo')).subscribe((res) => {
        this.usuarioDataHtml = res[0]
        this.listObservables = [load1$]
     })
   }

  //------------------------
  navProfile() {
    this.router.navigate(['home']);
  }

  // ---------- No se que hacen -----------  
  scan(){
    this.router.navigate(['/escanear']);
  }
  generate(){
    this.router.navigate(['/generar']);
  }
  // ------------------------
}
