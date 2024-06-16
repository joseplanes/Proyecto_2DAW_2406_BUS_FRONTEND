import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineasService {

  private lineas:any;
  private urlBase:string ="http://44.209.101.20/usuario/lineas"

  constructor(private http:HttpClient) {
    this.setLineas();
   }

   setLineas(): Observable<any[]>{
    this.lineas = this.http.get<any[]>(this.urlBase)
    
    return this.lineas;
  }
  getLineas(){
    return this.lineas;
  }
}
