import { Component, Input } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { LineaDetalleService } from '../../servicios/linea-detalle.service';
import { MapaComponent } from '../mapa/mapa.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paradas',
  standalone: true,
  imports: [MapaComponent, RouterLink],
  templateUrl: './paradas.component.html',
  styleUrl: './paradas.component.css'
})
export class ParadasComponent {
  constructor(private servicioComunicacion: ComunicacionService, private servicioLineaDetalle: LineaDetalleService) {
   }
  @Input() paradas: any;
  @Input() recorrido: any;
  ocultarHorarios() {
    this.servicioComunicacion.ocultarHorarios();
  }
  getMostrarHorarios() {
    return this.servicioComunicacion.getMostrarHorarios();
  }
  setParada(parada:any) {
    this.servicioLineaDetalle.setParada(parada);
    this.servicioComunicacion.verHorarios();
  }
  getEnlacesLength(parada:any) {
    return parada.enlaces.length;
  }
}
