import { Component, OnInit, ViewChild  } from '@angular/core';
import { Paquete } from '../paquete';
import { PaquetesService } from '../paquetes.service';
import { Venta } from '../venta';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-personas-por-destino',
  templateUrl: './personas-por-destino.component.html',
  styleUrls: ['./personas-por-destino.component.css']
})
export class PersonasPorDestinoComponent implements OnInit {

  paquetes : Paquete [];
  ventas : Venta [];
  ventaPaqueteGroup;
  venta: any;
  paquete: any;
  nombreDestinos : string [];
  personasPorDestino : number[];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;


  constructor(private paqueteService: PaquetesService) { 
    
    this.nombreDestinos = [''];
    this.personasPorDestino = [0];
    
    this.chartOptions = {
      series: [
        {
          name: 'Personas',
          data: [],
          //[10, 41, 35, 51, 49]
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: 'Personas por Destino',
      },
      xaxis: {
        categories: [this.nombreDestinos],
        //[this.nombreDestinos]
        //['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      
    };
  
  
  }

  ngOnInit() {
    this.ventas = [];
    this.paquetes = [];
    this.nombreDestinos = [''];
    this.personasPorDestino = [0];

    this.getPaquetes();
    this.getVentas();
    
  }
  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["destinos"];
    //this.paqueteService.setPaquetes(this.paquetes);
    this.nombreDestinos = this.paquetes.map(function(paquete) {
        return paquete.nombre;
      });
      console.log(this.nombreDestinos);
    console.log(this.paquetes + 'paquetes personas por destino');  
    });
   }


   getVentas(){
    this.paqueteService.getVentas().subscribe((response)=> {
      this.ventas = response["ventas"];
      this.paqueteService.setVentas(this.ventas);
      //this.getPersonasPorDestino();
      for (var i=0; i< this.ventas.length; i++) { 
        for (var j=0; j < this.paquetes.length; j++){
          console.log(this.ventas[i].id_paquete + 'ventasidpaquete');
          console.log(this.paquetes[j].id + 'paquetesid');
          if (this.paquetes[j].id === this.ventas[i].id_paquete){
            console.log(this.ventas[i].cantidad_mayores + ' cantMay' + this.paquetes[j].id + ' destino');
            console.log(this.ventas[j].cantidad_menores + 'cantMen'+ this.paquetes[j].id + ' destino');
            this.personasPorDestino[this.paquetes[j].id-1] += this.ventas[i].cantidad_mayores;
            this.personasPorDestino[this.paquetes[j].id-1] += this.ventas[i].cantidad_menores;
          }
        }
      }
      console.log(this.personasPorDestino + 'personas por destino');
      });
      
  }

  //getNombreDestinos(){
  //  setTimeout(function(){
      //this.nombreDestinos = this.paquetes.slice();
  //    console.log('getNombreDestinos1');
  //    this.paquetes = [];
      //for (var i in this.paquetes) {
        //var i=0; i< this.paquetes.length(); i++
      //  console.log(i + 'dentro del for'); //this.paquetes[i].nombre +
        
      //}
      //this.nombreDestinos = this.paquetes.map(function(paquete) {
      //  return paquete.nombre;
      //});
      //console.log(this.nombreDestinos);
      
   //   console.log(this.paquetes + 'nuevamentePaquetes');
      //const DestinosNombre = this.paqueteService.getPaquetes().map(function(paquete) {
      //  return paquete.nombre;
      //});
      //console.log(DestinosNombre);
      //this.paquetes.forEach( function(paquetes) {
        //this.nombreDestinos[paquete.id] = paquete.nombre;
      //  console.log(paquetes.nombre);
      //});
   // }, 5000);
//  }

  getPersonasPorDestino(){
    setTimeout(function(){
      console.log('getPersonasPorDestino antes del for');
      //for (var i=0; i< this.ventas.length; i++) { 
      //  for (var j=0; i< this.paquetes.length; j++){
      //    console.log(this.ventas[i].id_paquete);
      //    console.log(this.paquetes[j].id);
      //    if (this.paquetes[j].id === this.ventas[i].id_paquete){
      //      this.personasPorDestino[this.paquetes[j].id] = this.ventas[i].cantidad_mayores;
      //      this.personasPorDestino[this.paquetes[j].id] = this.ventas[i].cantidad_menores;
      //    }
      //  }
     // }
      
        //if (paquetes.id === ventas.id_paquete){
        //      this.personasPorDestino[paquetes.id] += ventas.cantidad_mayores;
        //      this.personasPorDestino[paquetes.id] += ventas.cantidad_menores;
        //      console.log('getPersonasPorDestinoDentro');
        //    }
        //  })
        //})
      //}
      //console.log('getPersonasPorDestinoFuera');
      //console.log(this.personasPorDestino);
      //console.log(this.paquetes);
    }, 2000);
  }


    
}