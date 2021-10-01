import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Paquete } from './paquete';

@Injectable({
    providedIn: 'root'
  })
export class PaquetesService {
  paquetes : Paquete[] = [];
  venta : any;
  //apikey : any;
  user: UserService;

  constructor(
    private http: HttpClient, 
    private userService: UserService) { 
  }

  setPaquetes(paquetes: any) {
    this.paquetes = paquetes;
  }

  getPaquetes() {
    return this.paquetes;
  }

  setVenta(venta : any){
    this.venta = venta;
  }

  getVenta(){
    return this.venta;
  }

  getPaquetesApi() {
    const apikey = this.userService.getApiKey(); 
    const headers = { 'Content-type': 'application/json', 'apikey' : apikey};
    console.log(apikey);
     
    return this.http.get('https://destinos.develotion.com/paquetes.php', {
      headers
    });
  }

  getVentas(){
    const apikey = this.userService.getApiKey(); 
    const userId = this.userService.getUserId();
    const headers = { 'Content-type': 'application/json', 'apikey' : apikey};
    console.log(apikey, userId);
     
    return this.http.get(`https://destinos.develotion.com/ventas.php?idVendedor=`+userId, {
      headers
    });
    
  }

  agregarVenta(nombreCliente: string, idPaquete: Number, cantidadMayores: Number, cantidadMenores: Number) {
    const apikey = this.userService.getApiKey();
    const userId = this.userService.getUserId(); 
    const headers = { 'Content-type': 'application/json' , 'apikey' : apikey};
    console.log(userId, nombreCliente, idPaquete, cantidadMayores, cantidadMenores);
    console.log(typeof idPaquete);
    const body = JSON.stringify({ userId, nombreCliente, idPaquete, cantidadMayores, cantidadMenores });
    return this.http.post('https://destinos.develotion.com/ventas.php', body, {
      headers
    });
  }



}