import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  resultados = false;
  mostrarHorarios:boolean = true;
  parada:any;
  titulo:string = 'Origen - Destino'
 
  setResultados(resultados:boolean) {
    this.resultados = resultados;
  }
  getResultados() {
    return this.resultados;
  }
  verHorarios() {
    this.mostrarHorarios = true;
  }
  ocultarHorarios() {
    this.mostrarHorarios = false;
  }
  getMostrarHorarios() {
    return this.mostrarHorarios;
  }
  setParada(parada:any) {
    this.parada = parada;
  }
  getParada() {
    return this.parada;
  }
  setTitulo(titulo:string){
    this.titulo = titulo
  }
  getTitulo(){
    return this.titulo
  }
}
