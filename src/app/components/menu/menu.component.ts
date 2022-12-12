import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { menuItems } from 'src/app/interfaces/interfaceMenu';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuItems: Observable<menuItems[]>;

  constructor( private dataServices: DataService,
               private storage: Storage ) {
                
                this.menuItems = this.dataServices.getMenuOpts();
                }

  ngOnInit() {
    
  }

  logout() {
    localStorage.setItem('guard', 'false');
    this.storage.remove('usuario')
  }

  

}
