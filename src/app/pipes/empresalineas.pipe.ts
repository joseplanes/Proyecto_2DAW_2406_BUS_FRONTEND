import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empresalineas',
  standalone: true
})
export class EmpresalineasPipe implements PipeTransform {

  transform(lineas: any[], empresa: string): any[] {
    if(lineas && lineas.length)
      if(empresa.toLowerCase() != "todas" && empresa.toLowerCase() != "")
        return lineas.filter(linea => linea.empresa.toLowerCase() === empresa.toLowerCase())
      else 
        return lineas
    else
      return []
  }

}
