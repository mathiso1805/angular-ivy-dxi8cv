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
    this.getPaquetes();
    this.getVentas();
    this.nombreDestinos = [''];
    this.personasPorDestino = [1];
    
    this.chartOptions = {
      series: [
        {
          name: 'Personas',
          data: this.personasPorDestino,
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
        categories: this.nombreDestinos,
        //['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      },
      
    };
    console.log(this.personasPorDestino + 'personas por destino');  
  
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
    this.nombreDestinos = this.paquetes.map(function(paquete) {
        return paquete.nombre;
      });
      console.log(this.nombreDestinos);
    console.log(this.paquetes + 'paquetes personas por destino');  
    });
   }


   getVentas(){    
     this.paqueteService.getVentas().subscribe((response)=> {
       this.ventas = response["ventas"];      
       this.paqueteService.setVentas(this.ventas);
             //this.getPersonasPorDestino();      
       for(var j=0; j < this.paquetes.length; j++){       
         this.personasPorDestino[j] = 0;      
        }      
        for (var i=0; i< this.ventas.length; i++) {         
          for (var j=0; j < this.paquetes.length; j++){                  
            if (this.paquetes[j].id === this.ventas[i].id_paquete){
              this.personasPorDestino[this.paquetes[j].id-1] += this.ventas[i].cantidad_mayores;this.personasPorDestino[this.paquetes[j].id-1] += this.ventas[i].cantidad_menores;          
            }        
          }      
        }      
        console.log(this.personasPorDestino + 'personas por destino');      
      });        
    }


    
}