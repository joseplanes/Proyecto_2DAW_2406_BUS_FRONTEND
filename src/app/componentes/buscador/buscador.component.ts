import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { OrigenDestinoService } from '../../servicios/origen-destino.service';
import { FormsModule } from '@angular/forms';
import {  format, dayStart, addDay } from '@formkit/tempo';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  origen: any;
  destino: any;
  fecha: any;
  hora: any;
  paradas: any = JSON.parse(localStorage.getItem('paradas') || '[]');

  constructor(
    private comunicacionService: ComunicacionService,
    private origenDestinoService: OrigenDestinoService
  ) {
    if (localStorage.getItem('paradas') == null) {
      this.origenDestinoService.setParadas().subscribe((json: any) => {
        this.paradas = json[0].paradas;
        localStorage.setItem('paradas', JSON.stringify(this.paradas));
      });
    }
  }
  borrarFiltros() {
    this.origen = '';
    this.destino = '';
    this.fecha = undefined;
    this.hora = undefined;
    this.setParadaOrigen(undefined);
    this.setParadaDestino(undefined);
  }
  getBusqueda() {
    return this.origenDestinoService.getBusqueda();
  }
  setBusqueda(busqueda: boolean) {
    this.origenDestinoService.setBusqueda(busqueda);
  }
  setParadaOrigen(parada: any) {
    if (this.findParadaByNombre(parada) != undefined) {
      this.origenDestinoService.setParadaOrigen(
        this.findParadaByNombre(parada)
      );
    } else this.origenDestinoService.setParadaOrigen(undefined);
  }
  setParadaDestino(parada: any) {
    if (this.findParadaByNombre(parada)) {
      this.origenDestinoService.setParadaDestino(
        this.findParadaByNombre(parada)
      );
    } else this.origenDestinoService.setParadaDestino(undefined);
  }
  findParadaByNombre(nombre: string) {
    return this.paradas.find(
      (parada: any) => parada.nombre + ', ' + parada.poblacion == nombre
    );
  }
  buscar(fecha: any, hora: any) {
    this.setParadaOrigen(this.origen);
    this.setParadaDestino(this.destino);
    let tipo: string;
    let horaFinal: any;
    let hoy:boolean = false;
    if (fecha == undefined) {
      fecha = format({
        date: new Date(),
        format: 'full',
        tz: 'Europe/Madrid',
      });
      hoy = true;
      if (hora == undefined) {
        horaFinal = format({
          date: new Date(),
          format: 'HH:mm',
          tz: 'Europe/Madrid',
        });
      } else {
        horaFinal = hora;
      }
    } else {
      fecha = format({
        date: fecha,
        format: 'full',
        tz: 'Europe/Madrid',
      });
      if (hora == undefined) {
        horaFinal = format({
          date: dayStart(new Date()),
          format: 'HH:mm',
          tz: 'Europe/Madrid',
        });
      } else {
        horaFinal = hora;
      }
    }
    tipo = this.setTipo(fecha);
    let mañana:string = '';
    let tipoMañana:string = '';
    if(hoy){
      mañana = format({
        date: addDay(new Date(), 1),
        format: 'full',
        tz: 'Europe/Madrid',
      });
      tipoMañana = this.setTipo(mañana);
    }

    this.origenDestinoService.buscar(tipo, horaFinal);

    this.origenDestinoService.setFecha(fecha);
    // if(hoy && this.origenDestinoService.getLineasDirectas().length === 0 && this.origenDestinoService.getCombinaciones().length === 0){
    //   this.origenDestinoService.buscar(tipoMañana, '00:00');
    //   this.origenDestinoService.setFecha(mañana);
    // }
    if(this.origenDestinoService.getParadaOrigen != undefined && this.origenDestinoService.getParadaDestino != undefined){
      this.setBusqueda(true);
    }
    else{
      this.setBusqueda(false);
    }
    
  }
  setTipo(fecha:any){
    let tipo:string;
    if (fecha.includes('domingo')) {
      tipo = 'Festivo';
    } else if (fecha.includes('sábado')) {
      tipo = 'Sabado';
    } else {
      tipo = 'Laboral';
    }
    return tipo;
  }
}
