import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [],
  templateUrl: './aviso-legal.component.html',
  styleUrl: './aviso-legal.component.css'
})
export class AvisoLegalComponent {
  titulo = 'Aviso Legal';
  constructor(private comunicacionService: ComunicacionService) {
    this.comunicacionService.setTitulo(this.titulo);
   }
}
