import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  

  constructor(private router: Router, private sqlite: SQLite) {
   }

  canActivate(){
    this.router.navigate(['login']);
    return false;
  }
}
