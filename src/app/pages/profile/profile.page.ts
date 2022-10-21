import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ApiService } from 'src/app/services/api.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  routerState: any;
  
  userLoginData:string;

  // usuarioDataHtml: Usuario;

  constructor(private router: Router,
              private activeroute: ActivatedRoute,
              private api: ApiService,
              private loginPageData: LoginPage) {
      // this.activeroute.queryParams.subscribe(
      // params => {
      //   if(this.router.getCurrentNavigation().extras.state){
      //     this.routerState = this.router.getCurrentNavigation().extras.state;
      //     localStorage.setItem('user', this.routerState.usuario);
      //   }
      // }
      // );
  }

  // getUsuarioByCorreo(correo){
  //   this.api.getUsuarios().subscribe((data) => {
  //     for(let i = 0; i < data.length; i++){
  //       if(correo == data[i].correo) {
  //         // this.usuarioDataHtml = data[i]
  //       } else {
  //         continue
  //       }
  //     }
  //   });
  // }



  ngOnInit(){
    // this.userLoginData = this.loginPageData.getUsuarioFromLogin();
    // this.getUsuarioByCorreo(this.userLoginData)
  }

}
