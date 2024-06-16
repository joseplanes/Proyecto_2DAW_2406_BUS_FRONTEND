import { Component } from '@angular/core';
import { AdminService } from '../../servicios/admin.service';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { NombrelineasPipe } from '../../pipes/nombrelineas.pipe';
import { EmpresalineasPipe } from '../../pipes/empresalineas.pipe';
import { TipolineasPipe } from '../../pipes/tipolineas.pipe';
import { FormsModule } from '@angular/forms';
import { AdminLineaBorradaComponent } from '../../componentes/admin-linea-borrada/admin-linea-borrada.component';

@Component({
  selector: 'app-admin-listado-borradas',
  standalone: true,
  imports: [NombrelineasPipe, EmpresalineasPipe, TipolineasPipe, FormsModule, AdminLineaBorradaComponent],
  templateUrl: './admin-listado-borradas.component.html',
  styleUrl: './admin-listado-borradas.component.css'
})
export class AdminListadoBorradasComponent {
  titulo = 'Líneas inactivas - Área privada';
  lineasBorradas: any;
  nombre:string = '';
  empresa:string = 'Todas';
  tipo:string = 'Todas';
  constructor(private adminService: AdminService, private comunicacionService: ComunicacionService) {
    this.adminService.setLineasEliminadas().subscribe((data) => {
      this.lineasBorradas = data[0];
    });
   }
  ngOnInit() {
    this.comunicacionService.setTitulo(this.titulo);
  }
actualizarLineas(){
    this.adminService.setLineasEliminadas().subscribe((data) => {
      this.lineasBorradas = data[0];
      console.log(this.lineasBorradas);
    }, error => {
      this.lineasBorradas = [];
  });
}
  borrarFiltros(){
    this.nombre = '';
    this.empresa = 'Todas';
    this.tipo = 'Todas';
  }
}
