import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-linea',
  standalone: true,
  imports: [],
  templateUrl: './admin-linea.component.html',
  styleUrl: './admin-linea.component.css'
})
export class AdminLineaComponent {
  @Input() linea: any;
}
