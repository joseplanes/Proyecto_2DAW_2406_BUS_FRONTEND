import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {
  @Input() incidencia: any;
  getLineasLength(){
    return this.incidencia.lineas.length
  }
}
