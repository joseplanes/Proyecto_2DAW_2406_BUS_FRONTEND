import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { ContactoService } from '../../servicios/contacto.service';
import { TarjetaContactoComponent } from '../../componentes/tarjeta-contacto/tarjeta-contacto.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [TarjetaContactoComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit{
  titulo:string = 'Contacto'
  empresas:any = JSON.parse(localStorage.getItem('empresas') || '[]')
  constructor(private comunicacionService: ComunicacionService, protected contactoService: ContactoService){
    if(localStorage.getItem('empresas') == null){
      this.contactoService.setEmpresas().subscribe((json:any) => {
        this.empresas = json
        localStorage.setItem('empresas', JSON.stringify(this.empresas));
      });
    }  
  }
  ngOnInit(): void {
      this.comunicacionService.setTitulo(this.titulo)
  }
}
