import { Component, OnInit } from '@angular/core';
import { Paquete } from '../paquete';
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


  constructor() { 
    
    this.chartOptions = {
      series: [
        {
          name: 'Personas',
          data: [this.personasPorDestino],
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
    this.paquetes.forEach( function(paquete, i, paquetes) {
      this.nombreDestinos[i] = paquete.nombre;
      console.log(this.nombreDestinos[i]);
    });
    
  }

  getPersonasPorDestino(){
    this.ventas.forEach( function(venta, i, ventas) {
      this.paquetes.forEach( function(paquete, j, paquetes) {
       if (paquete.id = venta.id_paquete){
          this.personasPorDestino[j] += venta.cantidad_mayores;
          this.personasPorDestino[j] += venta.cantidad_menores;
        }
        console.log(this.personasPorDestino);
      })
    })
  };
}