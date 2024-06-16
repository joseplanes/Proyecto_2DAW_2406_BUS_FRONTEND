import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../servicios/admin.service';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-editar.component.html',
  styleUrl: './admin-editar.component.css'
})
export class AdminEditarComponent {
  titulo: string = 'Editar línea - Área privada';
  popup:boolean = false;
  nombre: string = '';
  empresa: string = '1';
  tipo:string = 'Urbana'
  descripcion: string = '';
  errorNombre:string = '';
  errorDescripcion:string = '';
  empresas: any[] = [];
  regexNombre: RegExp = /^[A-Z]?[0-9]{1,2}$/;
  regexDescripcion: RegExp = /^([A-Za-z0-9 ,.ºª\s])+[-]{1}[A-Za-z0-9 ,.\-ºª\s]+$/;
  constructor(private comunicacionService: ComunicacionService, private adminService: AdminService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.comunicacionService.setTitulo(this.titulo);
    this.adminService.setEmpresas().subscribe((data) => {
      this.empresas = data[0];
    });
    this.adminService.verLinea(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
      this.nombre = data[0].linea;
      this.descripcion = data[0].descripcion;
      this.empresa = data[0].empresa;
      this.tipo = data[0].tipo;
    });
    
    
  }

  alternarPopup(){
    this.popup = !this.popup;
  }
  preventSubmit(event: any){
    event.preventDefault();
  }
  crearLinea(){
    this.errorNombre = '';
    this.errorDescripcion = '';
    if(this.nombre === ''){
      this.errorNombre = 'El campo nombre es obligatorio.';
    }else if(!this.regexNombre.test(this.nombre)){
      this.errorNombre = 'El nombre solo puede contener una letra mayúscula seguida de uno o dos números.';
    }
    if(this.descripcion === ''){
      this.errorDescripcion = 'El campo descripción es obligatorio.';
    }else if(!this.regexDescripcion.test(this.descripcion)){
      this.errorDescripcion = 'El formato del campo descripción es incorrecto. Debe separar los elementos de la descripción con un guión';
    }
    if(this.errorNombre === '' && this.errorDescripcion === ''){
      let empresaId = this.empresas.find(empresa => empresa.empresa === this.empresa).id;
      let idLinea = parseInt(this.activatedRoute.snapshot.params['id']);
      this.adminService.editarLinea(idLinea, {
        linea: this.nombre,
        descripcion: this.descripcion,
        empresa: empresaId,
        tipo: this.tipo,
      }).subscribe((data) => {
        this.router.navigate(['/admin-listado']);
      });
    }
  }
}
