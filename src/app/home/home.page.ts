import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  routerState: any;
  user: string;

  constructor(private router: Router, private activeroute: ActivatedRoute) {
    this.activeroute.queryParams.subscribe(
      params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.routerState = this.router.getCurrentNavigation().extras.state;
          localStorage.setItem('user', this.routerState.usuario);
        }
      }
    );
  }

  ngOnInit(){
    this.user = localStorage.getItem('user');
  }

}
