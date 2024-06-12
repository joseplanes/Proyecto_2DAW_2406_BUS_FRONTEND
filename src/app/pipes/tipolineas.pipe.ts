import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipolineas',
  standalone: true
})
export class TipolineasPipe implements PipeTransform {

  transform(lineas: any[], tipo: string): any[] {
    if(lineas && lineas.length)
      if(tipo.toLowerCase() != "todas" && tipo.toLowerCase() != "")
        return lineas.filter(linea => linea.tipo.toLowerCase() === tipo.toLowerCase())
      else 
        return lineas
    else
      return []
  }

}
