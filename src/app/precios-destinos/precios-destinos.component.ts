import { Component, OnInit, ViewChild } from '@angular/core';
import { Paquete } from '../paquete';
import { PaquetesService } from '../paquetes.service';

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
  selector: 'app-precios-destinos',
  templateUrl: './precios-destinos.component.html',
  styleUrls: ['./precios-destinos.component.css']
})
export class PreciosDestinosComponent implements OnInit {

  paquetes : Paquete [];
  paquete: any;
  nombreDestinos : string [];
  preciosPorDestino : number[];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;


  constructor(private paqueteService: PaquetesService) { 
    this.getPaquetes();
    this.nombreDestinos = [''];
    this.preciosPorDestino = [1];
    
    this.chartOptions = {
      series: [
        {
          name: 'Promedio de precio',
          data: this.preciosPorDestino,
          //[10, 41, 35, 51, 49]
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: 'Promedio de precios por Destino',
      },
      xaxis: {
        categories: this.nombreDestinos,
        //['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      
    };
  }

  ngOnInit() {
    this.paquetes = [];
    this.nombreDestinos = [''];
    this.preciosPorDestino = [1];

    this.getPaquetes();
    
  }
  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["destinos"];
    this.nombreDestinos = this.paquetes.map(function(paquete) {
        return paquete.nombre;
      });
    for(var j=0; j < this.paquetes.length; j++){       
      this.preciosPorDestino[j] = 0;      
    }
    for(var j=0; j < this.paquetes.length; j++){       
      this.preciosPorDestino[j] = (this.paquetes[j].precio_mayor +  this.paquetes[j].precio_menor) / 2 ;      
    }
    this.setChartOptions();    
    });
   }


  setChartOptions(){
    this.chartOptions = {
      series: [
        {
          name: 'Precios',
          data: this.preciosPorDestino,
          //[10, 41, 35, 51, 49]
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: 'Precios por Destino',
      },
      xaxis: {
        categories: this.nombreDestinos,
        //['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      }, 
    };
  }
    
}