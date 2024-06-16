import { Component } from '@angular/core';
import { AdminService } from '../../servicios/admin.service';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { NombrelineasPipe } from '../../pipes/nombrelineas.pipe';
import { EmpresalineasPipe } from '../../pipes/empresalineas.pipe';
import { TipolineasPipe } from '../../pipes/tipolineas.pipe';
import { AdminLineaComponent } from '../../componentes/admin-linea/admin-linea.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-listado',
  standalone: true,
  imports: [NombrelineasPipe, EmpresalineasPipe, TipolineasPipe, AdminLineaComponent, FormsModule],
  templateUrl: './admin-listado.component.html',
  styleUrl: './admin-listado.component.css',
})
export class AdminListadoComponent {
  titulo = 'Líneas - Área privada';
  lineas: any;
  nombre:string = '';
  empresa:string = 'Todas';
  tipo:string = 'Todas';
  constructor(
    private adminService: AdminService,
    private comunicacionService: ComunicacionService
  ) {
    this.adminService.setLineas().subscribe((data) => {
      this.lineas = data[0];
    });
  }
  setLineas():Observable<any[]>{
    this.adminService.setLineas().subscribe((data) => {
      this.lineas = data[0];
    });
    return this.lineas;
  }
  ngOnInit() {
    this.comunicacionService.setTitulo(this.titulo);
  }
  actualizarLineas(){
    this.adminService.setLineas().subscribe((data) => {
      this.lineas = data[0];
    });
  }
  borrarFiltros(){
    this.nombre = '';
    this.empresa = 'Todas';
    this.tipo = 'Todas';
  }
}
