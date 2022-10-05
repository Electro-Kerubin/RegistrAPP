import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    usuario: '',
    clave: ''
  };

  hide = true;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private sqlite: SQLite,
    ) {
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



  ngOnInit() {
  }
  
  async toastLoginSuccess() {
    const toast = await this.toastController.create({
      message: 'Inicio de sección exitosa.',
      duration: 2000
    });
    toast.present();
  }

  async toastLoginFail() {
    const toast = await this.toastController.create({
      message: 'Ingrese corectamente sus datos',
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
  const navegationExtras: NavigationExtras = {
  state: this.user,
      
  };
  this.router.navigate(['/home'], navegationExtras);
  this.toastLoginSuccess();
  console.log(this.user)
  }

  nav_restClave(){
  this.router.navigate(['/rest-clave']);
  }

}
