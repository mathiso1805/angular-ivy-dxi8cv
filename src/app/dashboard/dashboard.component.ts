import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMsg: any;
  mensaje: any;
  paquetes = [];
  ventas = [];
  ventaPaqueteGroup;

  constructor(private paqueteService: PaquetesService,
    private formBuilder: FormBuilder) {
      this.ventaPaqueteGroup = this.formBuilder.group({
        cliente: '',
        mipaquete: '',
        adultos:'',
        ninios:''
      });
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
    this.paqueteService.agregarVenta(cliente, mipaquete, adultos, ninios).subscribe(
      data => {
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

  ngOnInit() {
    this.getPaquetes();
    this.getVentas();
  }
}