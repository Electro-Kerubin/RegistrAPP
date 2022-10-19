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
  token: string = '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';
  // token: string = null;
  apiURL = 'http://192.168.0.3:3000';

  
  constructor(private http:HttpClient, private storage: Storage, private navCtrl: NavController) {
    this.storage.create();
   }

  login(usuario:string, password:string) {
    
    const data = {usuario, password};

    return new Promise(resolve => {
      this.http.post(this.apiURL+'/login', data)
        .subscribe(resp => {
          console.log(resp);
          if(resp['ok']) {
            // this.guardarToken(resp['token']);
            // console.log('si')
            // resolve(true);
          } else {
            // this.guardarToken(resp['token']);
            this.guardarToken(this.token);
            console.log('si')
            resolve(true);

            // console.log('no')
            // this.token = null;
            // this.storage.clear();
            // resolve(false);
          }
        });
    });
  }

  async guardarToken(token:string) {
    this.token = token;
    await this.storage.set('token', token);
  }

}
