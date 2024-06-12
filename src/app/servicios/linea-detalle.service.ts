import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaDetalleService {

  private cabeceraLinea: any;
  private recorrido:any;
  private paradas:any;
  private horarios: any;
  private parada:any;
  private direccion:any;
  private idSublinea:any;
  private urlBase: string = 'http://127.0.0.1:8000/usuario/';


  constructor(private http: HttpClient) {}

  
  setCabeceraLinea(idLinea:number): Observable<any[]> {
    this.cabeceraLinea = this.http.get<any[]>(this.urlBase + 'lineadetalleca/' + idLinea);
    return this.cabeceraLinea;
  }
  getCabeceraLinea(): Observable<any[]> {
    return this.cabeceraLinea;
  }
  
  setCuerpoLinea(idLinea:number, idSublinea:number, direccion:string): Observable<any[]> { 
    this.paradas = this.http.get<any[]>(this.urlBase + 'lineadetallecu/' + idLinea + '/' + idSublinea + '?direccion=' + direccion);
    return this.paradas;
  }
  getCuerpoLinea(): Observable<any[]> {
    return this.paradas;
  }
  setHorarios(idSublinea:number, idParada:number, direccion:string): Observable<any[]> {
    this.horarios = this.http.get<any[]>(this.urlBase + 'paradahorario/' + idSublinea + '/' + idParada + '?direccion=' + direccion);
    return this.horarios;
  }
  getHorarios(): Observable<any[]> {
    return this.horarios;
  }
  setRecorrido(){
    this.recorrido = this.cabeceraLinea.coordenadas;
    return this.recorrido;
  }
  getRecorrido(){
    return this.recorrido;
  }
  setParada(parada:any){
    this.parada = parada;
    return this.parada;
  }
  getParada(){
    return this.parada;
  }
  setDireccion(direccion:string){
    this.direccion = direccion;
    return this.direccion;
  }
  getDireccion(){
    return this.direccion;
  }
  setIdSublinea(idSublinea:number){
    this.idSublinea = idSublinea;
    return this.idSublinea;
  }
  getIdSublinea(){
    return this.idSublinea;
  }
}
