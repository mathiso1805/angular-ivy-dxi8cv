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




@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    RegistrarComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
