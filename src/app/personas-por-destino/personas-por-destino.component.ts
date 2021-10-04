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
  nombreDestinos : [];
  personasPorDestino : [];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;


  constructor(private paqueteService: PaquetesService) { 
    this.paquetes = paqueteService.getPaquetes();
    this.ventas = paqueteService.getVentasArr();
    this.getNombreDestinos();  
    this.getPersonasPorDestino();

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
        categories: [],
        //[this.nombreDestinos]
        //['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
    };
  }

  ngOnInit() {
  }
  
  getNombreDestinos(){
    
    //this.nombreDestinos = this.paquetes.slice();
    console.log('getNombreDestinos');
    this.paquetes.forEach( function(paquete, i) {
      this.nombreDestinos[i] = paquete.nombre;
      console.log(this.nombreDestinos[i].nombre);
    });
    
  }
//PRECISO TRAERME LAS LISTAS DEL SERVICE 
  getPersonasPorDestino(){
    
    //if(this.ventas.length() > 0){
      this.ventas.forEach( function(venta, i) {
        this.paquetes.forEach( function(paquete, j) {
        if (paquete.id === venta.id_paquete){
            this.personasPorDestino[j] += venta.cantidad_mayores;
            this.personasPorDestino[j] += venta.cantidad_menores;
          }
        })
      })
    //}
    console.log(this.personasPorDestino + 'getPersonasPorDestino');
    console.log(this.paquetes + ' getPersonasPorDestinoPaquetes');
  }

}