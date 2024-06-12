import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrelineas',
  standalone: true
})
export class NombrelineasPipe implements PipeTransform {

  transform(lineas: any[], nombre: string): any[] {
    if(lineas && lineas.length){
      return lineas.filter(linea => linea.linea.toLowerCase().includes(nombre.toLowerCase().trim()))
    }
    else
      return []
  }

}
