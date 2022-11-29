import { Injectable } from '@angular/core';
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

  apiURL = 'https://my-json-server.typicode.com/Electro-Kerubin/ApiRegistrAPP';

  
  constructor(private http:HttpClient, private storage: Storage, private navCtrl: NavController) {
    this.storage.create();
   }

  // NO SE USO
  //  getUsuario(userId):Observable<any>{
  //   return this.http.get(this.apiURL+'/usuarios/'+userId).pipe(
  //     retry(3)
  //   );
  // }

   getUsuarios():Observable<any> {
    return this.http.get(this.apiURL+'/usuarios').pipe(
      retry(3)
    );
   }

   getUsuarioById(data: any): Observable<any> {
    return this.http.get(this.apiURL+'/usuarios/'+data).pipe(
      retry(3)
    );
   }
   
   validadorlogin(correo: string, pass: string){
    const usuario = this.getUsuarios().subscribe((data) => {
      for(let i = 0; i < data.length; i++) {
        if(correo == data[i].correo && pass == data[i].contraseña) {
          usuario.unsubscribe()
          return true;
        } else {
          continue
        }
      }
      usuario.unsubscribe()
      return false
    });
   }

}
