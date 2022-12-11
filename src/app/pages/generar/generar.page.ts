import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
})
export class GenerarPage implements OnInit, OnDestroy {

  private fecha = null;

  public myAngularxQrCode: string = null;

  qr = {
    asignatura: ''
  };
  
  asignaturas: any[] = []

  listObservables: Array<Subscription>;

  constructor(private firebase: FirebaseService,) {
    //toma la fecha actual y la guarda en una variable
    this.fecha = new Date();
    this.getData()
  }

  ngOnDestroy(): void {
    console.log("Destroy generar")
    this.listObservables.forEach(res => res.unsubscribe)
    this.asignaturas.splice(0)
  }

  ngOnInit() {
  }

  getData() {
    const load1$ = this.firebase.getDataByEmail(localStorage.getItem('correo')).subscribe((res) => {
       this.listObservables = [load1$]
       
      for(let i = 0; i < res[0]['asistencia'].length; i++) {
        let asignatura = {
                nombre: res[0]['asistencia'][i]['id']
        }
        this.asignaturas.push(asignatura)
      }
    })
  }

  //crea una variable tomando la asignatura que elegimos y la fecha actual para generar un string que creara un qr en el generar.html
  generar(){
    this.myAngularxQrCode ='Asignatura Registrada: '+this.qr.asignatura + ', Fecha:' + this.fecha;
    console.log(this.qr.asignatura)
  }

  

}
