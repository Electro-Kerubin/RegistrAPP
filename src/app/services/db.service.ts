import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  

  constructor(private router: Router, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(MAIL VARCHAR(75), CONTRASEÑA VARCHAR(30))',
      []).then(() => {
        console.log('FSR: TABLA CREADA OK');
      }).catch(e => {
        console.log('FSR: TABLA NOK');
      })
    }).catch(e => {
      console.log('FSR: BASE DE DATOS NOK');
    })
   }

   validarUsuario(mail) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO WHERE MAIL = ?',
      [mail]).then(( data ) => {
        console.log('FSR: TABLA CREADA OK');
      }).catch(e => {
        console.log('FSR: TABLA NOK');
      })
    }).catch(e => {
      console.log('FSR: BASE DE DATOS NOK');
    })
   }

  canActivate(){
    this.router.navigate(['login']);
    return false;
  }
}
