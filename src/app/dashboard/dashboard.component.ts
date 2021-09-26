import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  paquetes = this.paqueteService.getPaquetesApi();

  constructor(private paqueteService: PaquetesService) {}

  ngOnInit() {
  }

}