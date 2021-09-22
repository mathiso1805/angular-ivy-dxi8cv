import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent }
    ])
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent,
    LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
