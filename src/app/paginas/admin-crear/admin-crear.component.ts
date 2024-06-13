import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { AdminService } from '../../servicios/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-crear',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-crear.component.html',
  styleUrl: './admin-crear.component.css',
})
export class AdminCrearComponent {
  titulo: string = 'Nueva línea - Área privada';
  nombre: string = '';
  empresa: string = '1';
  tipo:string = 'Urbana'
  descripcion: string = '';
  errorNombre:string = '';
  errorDescripcion:string = '';
  empresas: any[] = [];
  sublineas: any[] = ['A'];
  regexNombre: RegExp = /^([A-Z0-9])+$/;
  regexDescripcion: RegExp = /^([A-Za-z0-9 ,.ºª\s])+[-]{1}[A-Za-z0-9 ,.-ºª\s]+$/;
  constructor(
    private comunicacionService: ComunicacionService,
    private adminService: AdminService
  ) {
    this.comunicacionService.setTitulo(this.titulo);
    this.adminService.setEmpresas().subscribe((data) => {
      this.empresas = data[0];
    });
  }
  eliminarSublinea(){
    if(this.sublineas.length > 1){
      this.sublineas.pop();
    }
  }
  addSublinea(){
    if(this.sublineas.length != 26){
      let ultimaSublinea = this.sublineas[this.sublineas.length - 1];
    let letraActual = ultimaSublinea.charCodeAt(0);
    let nuevaLetra = String.fromCharCode(letraActual + 1);
    
    this.sublineas.push( nuevaLetra );
    }
    
  }
  preventSubmit(event: any){
    event.preventDefault();
  }
  crearLinea(){
    console.log('Nombre ', this.nombre, 'empresa ',this.empresa, 'tipo ', this.tipo, 'descripcion ', this.descripcion)
    this.errorNombre = '';
    this.errorDescripcion = '';
    console.log('Nombre ', this.nombre, 'empresa ',this.empresa, 'tipo ', this.tipo, 'descripcion ', this.descripcion)
    if(this.nombre === ''){
      this.errorNombre = 'El campo nombre es obligatorio.';
    }else if(!this.regexNombre.test(this.nombre)){
      this.errorNombre = 'El campo nombre solo puede contener letras mayúsculas y números.';
    }
    if(this.descripcion === ''){
      this.errorDescripcion = 'El campo descripción es obligatorio.';
    }else if(!this.regexDescripcion.test(this.descripcion)){
      this.errorDescripcion = 'El formato del campo descripción es incorrecto. Debe ser "Población origen-Población destino".';
    }
    if(this.errorNombre === '' && this.errorDescripcion === ''){
      let sublineasString: string = this.sublineas.join(',');
      this.adminService.crearLinea({
        linea: this.nombre,
        descripcion: this.descripcion,
        empresa: parseInt(this.empresa),
        sublinea: sublineasString,
        tipo: this.tipo,
      }).subscribe((data) => {
        console.log(data);
      });

    }
  }

}
