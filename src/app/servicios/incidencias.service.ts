import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private incidencias:any;
  private urlBase:string ="http://127.0.0.1:8000/usuario/incidencias"

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
