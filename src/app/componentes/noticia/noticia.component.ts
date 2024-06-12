import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  @Input() noticia:any
  private router = inject(Router)
}
