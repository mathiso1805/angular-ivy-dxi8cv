import { Component, OnInit} from '@angular/core';
import { PaquetesService } from '../paquetes.service';
import { FormBuilder, Validators } from '@angular/forms';
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
  precioFinal : number [];



  constructor(private paqueteService: PaquetesService,
    private router: Router,   
    private formBuilder: FormBuilder) 
    {
      this.precioFinal = [0];
      this.ventas = [];
      this.paquetes = [];

      this.ventaPaqueteGroup = this.formBuilder.group({
        cliente: ['', Validators.required],
        mipaquete: ['', Validators.required],
        adultos:['', Validators.required, Validators.max(10)],
        ninios:['', Validators.required, Validators.max(10)]
      });
      //this.getPaquetes();
      //this.getVentas();

    }

  
  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["destinos"];
    //this.paqueteService.setPaquetes(this.paquetes);
    console.log(this.paquetes);   
    });
   }


  ventaSubmit() {
    this.errMsg = '';
    const { cliente, mipaquete, adultos, ninios } = this.ventaPaqueteGroup.value;
    console.log(this.ventaPaqueteGroup.value);
    
      if (this.ventaPaqueteGroup.valid)
      this.paqueteService.agregarVenta(cliente, mipaquete, adultos, ninios).subscribe(
          venta => {
            this.paqueteService.setVenta(venta);
            console.log(venta);
            //this.ngOnInit();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/dashboard']));
          },
          ({ error: { mensaje } }) => {
            this.errMsg = mensaje;
          }
        );
      else
        this.errMsg = "Hay datos inválidos en el formulario";
    
  }

  getVentas(){
    this.paqueteService.getVentas().subscribe((response)=> {
      this.ventas = response["ventas"];
      for(var j=0; j < this.ventas.length; j++){       
        this.precioFinal[j] = 0;      
      }      
      for (var i=0; i< this.ventas.length; i++) {         
        for (var j=0; j < this.paquetes.length; j++){                  
          if (this.paquetes[j].id === this.ventas[i].id_paquete){
            this.precioFinal[i] += this.ventas[i].cantidad_mayores * this.paquetes[j].precio_mayor; 
            this.precioFinal[i] += this.ventas[i].cantidad_menores * this.paquetes[j].precio_menor;
          }        
        }      
      }      
      //console.log(this.precioFinal + ' precioFinal');
        for(var j=0; j < this.ventas.length; j++){       
          this.ventas[j].precio_final = this.precioFinal[j];
        }
      console.log(this.ventas);
      });
  }
      

  ngOnInit() {
    this.precioFinal = [0];
    this.ventas = [];
    this.paquetes = [];
    this.getPaquetes();
    this.getVentas();
    this.ventaPaqueteGroup = this.formBuilder.group({
      cliente: ['', Validators.required],
      mipaquete: ['', Validators.required],
      adultos:['', Validators.required],
      ninios:['', Validators.required]
    });
  }
}