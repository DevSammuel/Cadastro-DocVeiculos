import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; //GERENCIA TODOS OS MODOULOS HTTP GLOBALMENTE

import { AppComponent } from './app.component';
import { VeiculosComponent } from './veiculos/veiculos.component';

import {VeiculosService} from './veiculos.service'; 

@NgModule({
  declarations: [
    AppComponent,
    VeiculosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [HttpClientModule, VeiculosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
