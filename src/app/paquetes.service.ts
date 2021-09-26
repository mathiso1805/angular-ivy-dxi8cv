import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
  })
export class PaquetesService {
  paquetes : [];
  apikey : any;
  //user: UserService;

  constructor(private http: HttpClient) { 
    //this.apikey = getApiKey();
    //this.user = this.user.getApiKey();
  }

  setPaquetes(paquetes: any) {
    this.paquetes = paquetes;
  }

  getPaquetes() {
    return this.paquetes;
  }

  

  getPaquetesApi() {
    const headers = { 'Content-type': 'application/json'};//, 'apikey' : this.apikey 
    
    return this.http.get('https://destinos.develotion.com/paquetes.php', {
      headers
    });
  }

}