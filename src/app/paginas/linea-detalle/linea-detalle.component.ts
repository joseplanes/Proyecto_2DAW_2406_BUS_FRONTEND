import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { LineaDetalleService } from '../../servicios/linea-detalle.service';
import { ParadasComponent } from '../../componentes/paradas/paradas.component';
import { HorariosComponent } from '../../componentes/horarios/horarios.component';
import { MapaComponent } from '../../componentes/mapa/mapa.component';


@Component({
  selector: 'app-linea-detalle',
  standalone: true,
  imports: [ParadasComponent, HorariosComponent, MapaComponent, RouterModule],
  templateUrl: './linea-detalle.component.html',
  styleUrl: './linea-detalle.component.css'
})
export class LineaDetalleComponent implements OnInit{
  titulo:string = 'Líneas'
  idLinea = this.activatedRoute.snapshot.params['id'];
  cabeceraLinea:any;
  idSublinea:any;
  nombreSublinea:any;
  recorrido:any;
  paradas:any;
  horarios:any;
  parada:any;
  direccion:any;
  direccionNombre:any;
  errorDireccion:boolean = false;
  interval:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private servicioComunicacion: ComunicacionService, private servicioLineaDetalle: LineaDetalleService) { }

  ngOnInit(): void {
    this.servicioComunicacion.setTitulo(this.titulo);
    
    this.servicioLineaDetalle.setCabeceraLinea(this.idLinea).subscribe((json) => {
      this.cabeceraLinea = json[0];
      this.recorrido = this.cabeceraLinea.coordenadas;
      this.idSublinea = this.servicioLineaDetalle.setIdSublinea(this.cabeceraLinea.sublineas[0].id);
      this.nombreSublinea = this.cabeceraLinea.sublineas[0].nombre;
      this.direccion = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
      this.direccionNombre = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
      this.servicioLineaDetalle.setCuerpoLinea(this.idLinea, this.idSublinea, this.direccion).subscribe((json) => {
        this.paradas = json[0];
        this.parada = this.paradas[0];
      });
    });
    this.ocultarHorarios();

  }
  setParada(parada:any) {
    this.parada = this.servicioLineaDetalle.setParada(parada);
    this.servicioComunicacion.verHorarios();
  }
  ocultarHorarios() {
    this.servicioComunicacion.ocultarHorarios();
  }
  getMostrarHorarios() {
    return this.servicioComunicacion.getMostrarHorarios();
  }
  cambiarSublinea(idSublinea: string) {
    this.errorDireccion = false;
    let sublineaParse = parseInt(idSublinea);
    this.idSublinea = sublineaParse;
    const sublineaSeleccionada = this.cabeceraLinea.sublineas.find((sublinea:any) => sublinea.id === this.idSublinea);
    if (sublineaSeleccionada) {
      this.nombreSublinea = sublineaSeleccionada.nombre;
    }
    this.servicioLineaDetalle.setCuerpoLinea(this.idLinea, this.idSublinea, this.cabeceraLinea.direccion[0].direccion).subscribe((json) => {
      this.direccionNombre = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
      this.direccion = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
      this.paradas = json[0];
      this.parada = this.paradas[0];
    },
    error => {
      this.servicioLineaDetalle.setCuerpoLinea(this.idLinea, this.idSublinea, this.cabeceraLinea.direccion[1].direccion).subscribe((json) => {
        this.direccionNombre = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[1].direccion);
        this.paradas = json[0];
        this.parada = this.paradas[0];
      });
    });
    this.ocultarHorarios();
  }
  cambiarDireccion(){
    if(!this.errorDireccion){
      if(this.cabeceraLinea.direccion[1]){
        if(this.direccion == this.cabeceraLinea.direccion[1].direccion){
          this.direccion = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
        }
        else{
          this.direccion = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[1].direccion);
        }
        this.servicioLineaDetalle.setCuerpoLinea(this.idLinea, this.idSublinea, this.direccion).subscribe(
          (json) => {
            this.paradas = json[0];
            this.parada = this.paradas[0];
            if(this.cabeceraLinea.direccion[1]){
              if(this.direccionNombre == this.cabeceraLinea.direccion[1].direccion){
                this.direccionNombre = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[0].direccion);
              }
              else{
                this.direccionNombre = this.servicioLineaDetalle.setDireccion(this.cabeceraLinea.direccion[1].direccion);
              }
            }
          },
          error => {
            this.errorDireccion = true;
            if(this.interval){
              clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
              this.errorDireccion = false;
            }, 3000);
          }
        );
      }
      else{
        this.errorDireccion = true;
        if(this.interval){
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          this.errorDireccion = false;
        }, 3000);
      }
    }
    else{
      if(this.interval){
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        this.errorDireccion = false;
      }, 3000);
    }
    
  }
}
