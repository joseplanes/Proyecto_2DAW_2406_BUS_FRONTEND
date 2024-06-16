import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private incidencias:any;
  private urlBase:string ="http://44.209.101.20/usuario/incidencias"

  constructor(private http:HttpClient) {
    this.setIncidencias();
   }

   setIncidencias(): Observable<any[]>{
    this.incidencias = this.http.get<any[]>(this.urlBase)
    return this.incidencias;
  }
  getIncidencias(){
    return this.incidencias;
  }
}
