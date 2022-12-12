import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, OnDestroy {

  asistencia: any[] = [];

  //Lista de observables para evitar la fuga de memoria generada por las mutliples subscripciones
  listObservables: Array<Subscription>;

  constructor(
    private firebase: FirebaseService,
  ) {
    //this.porcentajeAsistencia(Number(localStorage.getItem('run')))
    this.getData()
  }
  ngOnDestroy(): void {
    this.listObservables.forEach(sub => sub.unsubscribe())
    console.log("homeDestroy")
  }

  ngOnInit() {
  }

  getData() {
    const load1$ = this.firebase.getDataByEmail(localStorage.getItem('correo')).subscribe((res) => {
       this.listObservables = [load1$]
       console.log(res[0]['asistencia'][0]['id'])
       for(let i = 0; i < res[0]['asistencia'].length; i++) {
        let asignatura = {
            nombre: res[0]['asistencia'][i]['id'],
            nombreProfesor: res[0]['asistencia'][i]['profesor'],
            asistenciaTotal: res[0]['asistencia'][i]['asistenciaTotal'],
            asistenciaAlumno: res[0]['asistencia'][i]['asistenciaAlumno'],
            porcentajeAsistencia: (Math.round(res[0]['asistencia'][i]['asistenciaAlumno'] / res[0]['asistencia'][i]['asistenciaTotal'] *100)),
        }
        this.asistencia.push(asignatura)
       }
    })
  }

}
