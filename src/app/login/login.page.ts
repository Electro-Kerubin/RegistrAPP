import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    usuario: '',
    clave: '',
  };

  hide = true;

  constructor(private router: Router ) { }

  ngOnInit() {
  }
  
  onSubmit() {
    const navegationExtras: NavigationExtras = {
      state: this.user,
      
    };
    this.router.navigate(['/home'], navegationExtras);
    console.log(this.user)
  }

  nav_restClave(){
    this.router.navigate(['/rest-clave']);
  }

}
