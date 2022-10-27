import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Nose para que se usa este services, NO borrar por si produce un error.
@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  constructor(private router: Router) {}

  canActivate(){
    this.router.navigate(['login']);
    console.log("test")
    return false;
  }
}
