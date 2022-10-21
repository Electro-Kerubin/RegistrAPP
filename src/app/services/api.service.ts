import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  private usuario: Usuario = {
    id: 0,
    run: '',
    dv: '',
    primerNombre: '',
    segundoNombre: '',
    paternoApellido: '',
    maternoApellido: '',
    correo: '',
    contraseña: ''
  };
  token: string = null;
  // token: string = null;
  apiURL = 'http://10.12.32.190:3000';

  
  constructor(private http:HttpClient, private storage: Storage, private navCtrl: NavController) {
    this.storage.create();
   }

   getUsuario(userId):Observable<any>{
    return this.http.get(this.apiURL+'/usuarios/'+userId).pipe(
      retry(3)
    );
  }

   getUsuarios():Observable<any> {
    return this.http.get(this.apiURL+'/usuarios').pipe(
      retry(3)
    );
   }
   
   
   

}
