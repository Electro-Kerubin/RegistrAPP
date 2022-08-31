import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-clave',
  templateUrl: './rest-clave.page.html',
  styleUrls: ['./rest-clave.page.scss'],
})
export class RestClavePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nav_login(){
    this.router.navigate(['/login']);
  }

}
