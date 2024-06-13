import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { IncidenciasService } from '../../servicios/incidencias.service';
import { IncidenciaComponent } from '../../componentes/incidencia/incidencia.component';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [IncidenciaComponent],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent implements OnInit{
  titulo:string = 'Incidencias'
  incidencias:any = JSON.parse(localStorage.getItem('incidencias') || '[]')
  constructor(private comunicacionService: ComunicacionService, private incidenciasService: IncidenciasService){
    if(localStorage.getItem('incidencias') == null){
      this.incidenciasService.setIncidencias().subscribe((json:any) => {
        this.incidencias = json[0]
        localStorage.setItem('incidencias', JSON.stringify(this.incidencias));
      });
      
    }  
  }
  ngOnInit(): void {
      this.comunicacionService.setTitulo(this.titulo)
  }
}
