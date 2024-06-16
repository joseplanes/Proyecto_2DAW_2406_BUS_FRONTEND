import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent {

  titulo = 'Política de Privacidad';

  constructor(private comunicacionService: ComunicacionService) {
    this.comunicacionService.setTitulo(this.titulo);
   }
}
