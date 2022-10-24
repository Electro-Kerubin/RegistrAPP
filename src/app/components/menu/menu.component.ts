import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { menuItems } from 'src/app/interfaces/interfaceMenu';
import { DataService } from 'src/app/services/data.service';
import { StorageTestService } from 'src/app/services/storage-test.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuItems: Observable<menuItems[]>;

  constructor( private dataServices: DataService,
               private storageTest: StorageTestService ) { }

  ngOnInit() {
    this.menuItems = this.dataServices.getMenuOpts();
  }

  logout() {
    localStorage.setItem('guard', 'false');
    this.storageTest.clearUsuarioCorreoData;

  }

}
