import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-linea',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './linea.component.html',
  styleUrl: './linea.component.css'
})
export class LineaComponent {
  @Input() linea:any;
}
