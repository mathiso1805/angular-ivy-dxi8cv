import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMsg: any;
  paquetes = [];

  constructor(private paqueteService: PaquetesService) {}

  
  getPaquetes(){
    this.paqueteService.getPaquetesApi().subscribe((response)=> {
    this.paquetes = response["data"];
    });
   }
  ngOnInit() {
    this.getPaquetes();
  }

}