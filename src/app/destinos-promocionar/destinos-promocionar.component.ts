import { Component, OnInit } from '@angular/core';
import { Paquete } from '../paquete';
import { PaquetesService } from '../paquetes.service';
import { Venta } from '../venta';

@Component({
  selector: 'app-destinos-promocionar',
  templateUrl: './destinos-promocionar.component.html',
  styleUrls: ['./destinos-promocionar.component.css']
})
export class DestinosPromocionarComponent implements OnInit {
  paquetes : Paquete [];
  ventas : Venta [];
  venta: any;
  paquete: any;
  nombreDestinos : string [];
  ventasCantidad : number[];

  constructor(private paqueteService: PaquetesService) { 
    this.getPaquetes();
    this.getVentas();
    this.nombreDestinos = [''];
    this.ventasCantidad = [0];
  }

  ngOnInit() {
    this.ventas = [];
    this.paquetes = [];
    this.nombreDestinos = [''];
    this.ventasCantidad = [0];

    this.getPaquetes();
    this.getVentas();
    
  }

  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["destinos"];
    //this.nombreDestinos = this.paquetes.map(function(paquete) {
    //    return paquete.nombre;
    //  });
    });
  }


  getVentas(){    
    this.paqueteService.getVentas().subscribe((response)=> {
      this.ventas = response["ventas"];      
      this.paqueteService.setVentas(this.ventas);

      for(var j=0; j < this.paquetes.length; j++){       
        this.ventasCantidad[j] = 0;      
      }      
      for (var i=0; i< this.ventas.length; i++) {         
        for (var j=0; j < this.paquetes.length; j++){                  
          if (this.paquetes[j].id === this.ventas[i].id_paquete){
            this.ventasCantidad[this.paquetes[j].id-1] += 1;
          }        
        }      
      }      
      for(var j=0; j < this.paquetes.length; j++){       
        this.paquetes[j].cantidadVentas = this.ventasCantidad[j];
      }
      //console.log(this.ventasCantidad + ' VentasCantidadApromocionar');
    });         
  }

}