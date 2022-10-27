import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  // Nose para que se usa este services, NO borrar por si produce un error.
  constructor(private router: Router) {}

  canActivate(){
    this.router.navigate(['login']);
    console.log("test")
    return false;
  }
}
