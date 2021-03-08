import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeiculoModel } from './veiculos/veiculo.model';

import {environment} from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) { } //REALIZA AS CHAMDAS HTTP

  cadastrarVeiculo(veiculo: VeiculoModel): Observable<any> { 
    return this.http.post(environment.apiUrl, veiculo);
  }

  listarVeiculos() : Observable<any>{
    return this.http.get(environment.apiUrl);
  }

  atualizarVeiculo(id:any, veiculo: VeiculoModel): Observable<any>{
    return this.http.put(environment.apiUrl.concat(id), veiculo);
  }

  removerVeiculo(id:any){
    return this.http.delete(environment.apiUrl.concat(id));
  }
  }

