import { Component, Input, OnInit } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { LineaDetalleService } from '../../servicios/linea-detalle.service';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [MapaComponent],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit{
  horarios:any; 
  @Input()
  @Input() paradas:any;
  @Input() recorrido:any;
  tipoSeleccionado:string = 'Laboral'

  constructor(private servicioComunicacion: ComunicacionService, private servicioLineaDetalle: LineaDetalleService) { }
  ngOnInit(): void {
    this.servicioLineaDetalle.setHorarios(this.servicioLineaDetalle.getIdSublinea(), this.servicioLineaDetalle.getParada().idParada, this.servicioLineaDetalle.getDireccion()).subscribe((json) => {
      this.horarios = json;
    });
  }

  getParada(){
    return this.servicioLineaDetalle.getParada();
  }
  verHorarios() {
    this.servicioComunicacion.verHorarios();
  }
  ocultarHorarios() {
    this.servicioComunicacion.ocultarHorarios();
  }
  getMostrarHorarios() {
    return this.servicioComunicacion.getMostrarHorarios();
  }
  setHorarios(parada:any) {
    // this.servicioLineaDetalle.getHorarios(parada.id).subscribe((json) => {
    //   this.horarios = json;
    // });
  }
}
