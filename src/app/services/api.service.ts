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

  apiURL = 'http://10.12.32.205:3000';

  
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
   
}
