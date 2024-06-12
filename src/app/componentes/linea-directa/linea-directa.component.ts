import { Component, Input } from '@angular/core';
import { OrigenDestinoService } from '../../servicios/origen-destino.service';
import { LineaDetalleService } from '../../servicios/linea-detalle.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-linea-directa',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './linea-directa.component.html',
  styleUrl: './linea-directa.component.css'
})
export class LineaDirectaComponent {
  @Input() linea:any;
  constructor(private origenDestinoService: OrigenDestinoService, private lineaDetalleService: LineaDetalleService) { }

  getParadaOrigen(){
    return this.origenDestinoService.getParadaOrigen()
  }
  getParadaDestino(){
    return this.origenDestinoService.getParadaDestino()
  }
  getTipo(){
    return this.origenDestinoService.getTipo()
  }
  getHora(){
    return this.origenDestinoService.getHora()
  }
  
  getHorarioDestino(){
    
  }
}
