import { Component } from '@angular/core';
import { LineasService } from '../../servicios/lineas.service';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { LineaComponent } from '../../componentes/linea/linea.component';
import { FormsModule } from '@angular/forms';
import { NombrelineasPipe } from '../../pipes/nombrelineas.pipe';
import { EmpresalineasPipe } from '../../pipes/empresalineas.pipe';
import { TipolineasPipe } from '../../pipes/tipolineas.pipe';

@Component({
  selector: 'app-lineas',
  standalone: true,
  imports: [LineaComponent, FormsModule, NombrelineasPipe, EmpresalineasPipe, TipolineasPipe],
  templateUrl: './lineas.component.html',
  styleUrl: './lineas.component.css'
})
export class LineasComponent {
  titulo:string = 'Líneas'
  nombre: string = '';
  empresa: string = 'Todas';
  tipo: string = 'Todas';
  public lineas: any = JSON.parse(localStorage.getItem('lineas') || '[]');
  constructor(private lineasService: LineasService, private comunicacionService: ComunicacionService) {
    if(localStorage.getItem('lineas') == null){
      this.lineasService.getLineas().subscribe((json:any) => {
        this.lineas = json;
        localStorage.setItem('lineas', JSON.stringify(this.lineas));
      });
    }
  }
  ngOnInit() {
    this.comunicacionService.setTitulo(this.titulo);
  }
  borrarFiltros() {
    this.nombre = '';
    this.empresa = 'Todas';
    this.tipo = 'Todas';
  }
}
