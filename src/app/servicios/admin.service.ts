import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlBase = 'http://localhost:8000/api/';
  lineas:any
  lineasEliminadas:any
  constructor(private http: HttpClient) { }

  setLineas(): Observable<any[]>{
    this.lineas = this.http.get<any[]>(this.urlBase + 'listado')
    
    return this.lineas;
  }
  setLineasEliminadas(): Observable<any[]>{
    this.lineasEliminadas = this.http.get<any[]>(this.urlBase + 'listadoBorradas')
    return this.lineasEliminadas;
  }
  borrarLinea(id:number){
    const body = { title: 'Borrar línea' }
    return this.http.put<any>(this.urlBase + 'borrarLinea/' + id, body)
  }
  recuperarLinea(id:number){
    const body = { title: 'Recuperar línea' }
    return this.http.put<any>(this.urlBase + 'recuperarLinea/' + id, body)
  }
}
