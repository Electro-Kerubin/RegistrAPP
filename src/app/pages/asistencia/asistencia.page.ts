import { Component, OnInit } from '@angular/core';
import { Asignaturas } from 'src/app/interfaces/asignaturas';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencia: any[] = [];

  constructor(
    private api: ApiService
  ) {
    this.porcentajeAsistencia(Number(localStorage.getItem('run')))
  }

  ngOnInit() {
  }


  // arreglar porque no especifica la asignatura
  porcentajeAsistencia(run: number) {
    const apiObs = this.api.getUsuarioById(run).subscribe((data) => {
      for(let i = 0; i < data.asignaturas.length; i++) {
        let asignatura = {
          nombre: data.asignaturas[i].id,
          nombreProfesor: data.asignaturas[i].profesor,
          asistenciaTotal: data.asignaturas[i].asistenciaTotal,
          asistenciaAlumno: data.asignaturas[i].asistenciaAlumno,
          porcentajeAsistencia: (Math.round(data.asignaturas[i].asistenciaAlumno / data.asignaturas[i].asistenciaTotal *100))
        }
        this.asistencia.push(asignatura)
      }
      return apiObs.unsubscribe()
    });
  }

}
