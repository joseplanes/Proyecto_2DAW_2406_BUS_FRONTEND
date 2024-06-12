import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component {
  constructor(private comunicacionService: ComunicacionService) {
    this.comunicacionService.setTitulo('');
  }
}
