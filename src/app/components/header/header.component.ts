import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  routerState: any;
  user: string;

  @Input() titulo: string;

  constructor( private menuCtrl: MenuController ) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
