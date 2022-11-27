import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { menuItems } from '../interfaces/interfaceMenu';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getMenuOpts() {
    return this.http.get<menuItems[]>('/assets/data/menu.json');
  }

  getAsistencias() {
    
  }

}
