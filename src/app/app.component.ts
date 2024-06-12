import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'BusAndCo-Front';
  constructor(private router: Router) {
    localStorage.removeItem('empresas');
    localStorage.removeItem('lineas');
    localStorage.removeItem('incidencias');
    localStorage.removeItem('paradas');
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  }
}
