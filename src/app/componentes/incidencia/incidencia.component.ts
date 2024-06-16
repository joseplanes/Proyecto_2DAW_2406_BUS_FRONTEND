import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-incidencia',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {
  @Input() incidencia: any;
  getLineasLength(){
    return this.incidencia.lineas.length
  }
}
