import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-contacto',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-contacto.component.html',
  styleUrl: './tarjeta-contacto.component.css'
})
export class TarjetaContactoComponent {
  @Input() empresa: any;
}
