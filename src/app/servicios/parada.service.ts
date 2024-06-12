import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParadaService {

  parada:any;
  constructor() { }
  setParada(parada:any) {
    this.parada = parada;
  }
  getParada() {
    return this.parada;
  }
}
