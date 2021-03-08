import { Component, OnInit } from '@angular/core';
import { VeiculosService } from '../veiculos.service';
import { VeiculoModel } from './veiculo.model';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  veiculo: VeiculoModel = new VeiculoModel();
  veiculos: Array<any> = new Array(); // RECEBE O RETORNO DE CHAMADA DA API

  constructor(private veiculosService: VeiculosService) { }

  ngOnInit() {
    this.listarVeiculos();
  }

  atualizar(id:number){
      this.veiculosService.atualizarVeiculo(id, this.veiculo).subscribe(veiculo => {
      this.veiculo = new VeiculoModel();
      this.listarVeiculos();
     }, err => {
       console.log ('Erro ao atualizar veiculo', err)
   })

  }

  remover(id:number){
    this.veiculosService.removerVeiculo(id).subscribe(veiculo => {
      this.veiculo = new VeiculoModel();
      this.listarVeiculos();
     }, err => {
       console.log ('Erro ao remover veiculo', err)
   })

  }

cadastrar(){
 console.log(this.veiculo);
 this.veiculosService.cadastrarVeiculo(this.veiculo).subscribe(veiculo => {
   this.veiculo = new VeiculoModel();
   this.listarVeiculos();
  }, err => {
    console.log ('Erro ao cadastrar veiculo', err)
})
}

  listarVeiculos(){
    this.veiculosService.listarVeiculos().subscribe(veiculos => {
      this.veiculos = veiculos;
    }, err => {
      console.log('Erro ao listar os veiculos', err);
    })  
  }
}
