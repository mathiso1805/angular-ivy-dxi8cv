import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PersonasPorDestino } from './personas-por-destino/personas-por-destino.component';



@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'registrar', component: RegistrarComponent }
    ])
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent,
    LoginComponent,
    DashboardComponent,
    TopBarComponent,
    RegistrarComponent,
    PersonasPorDestino    
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
