import { Component, OnInit, ViewChild } from '@angular/core';
import { PaquetesService } from '../paquetes.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Paquete } from '../paquete';
import { Venta } from '../venta';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMsg: any;
  mensaje: any;
  paquetes : Paquete [];
  ventas : Venta [];
  ventaPaqueteGroup;
  venta: any;
  nombreDestinos : [];
  personasPorDestino : [];


  constructor(private paqueteService: PaquetesService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.ventaPaqueteGroup = this.formBuilder.group({
        cliente: '',
        mipaquete: '',
        adultos:'',
        ninios:''
      });
      this.getPaquetes();
      this.getVentas();
      this.getPersonasPorDestino();
      this.getNombreDestinos();

    }

  
  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["destinos"];
    console.log(this.paquetes);
    });
   }


  ventaSubmit() {
    this.errMsg = '';
    const { cliente, mipaquete, adultos, ninios } = this.ventaPaqueteGroup.value;
    console.log(this.ventaPaqueteGroup.value);
    this.paqueteService.agregarVenta(cliente, mipaquete, adultos, ninios).subscribe(
      venta => {
        this.paqueteService.setVenta(venta);
        console.log(venta);
        this.ngOnInit();
        
      },
      ({ error: { mensaje } }) => {
        this.errMsg = mensaje;
      }
    );
  }

  getVentas(){
    this.paqueteService.getVentas().subscribe((response)=> {
      this.ventas = response["ventas"];
      console.log(this.ventas);
      });
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
  

  ngOnInit() {
    this.getPaquetes();
    this.getVentas();
    this.getPersonasPorDestino();
    this.getNombreDestinos();
    this.ventaPaqueteGroup = this.formBuilder.group({
      cliente: '',
      mipaquete: '',
      adultos:'',
      ninios:''
    });
  }
}