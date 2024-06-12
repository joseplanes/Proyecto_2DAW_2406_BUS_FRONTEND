import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private empresas:any;
  private urlBase:string ="http://127.0.0.1:8000/usuario/contacto"

  constructor(private http:HttpClient) {
    this.setEmpresas();
   }

   setEmpresas(): Observable<any[]>{
    this.empresas = this.http.get<any[]>(this.urlBase)
    return this.empresas;
  }
  getEmpresas(){
    return this.empresas;
  }
}
