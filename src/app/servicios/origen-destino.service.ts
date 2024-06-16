import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrigenDestinoService {

  private paradas: any;
  private paradaOrigen: any;
  private paradaDestino: any;
  private resultados: any;
  private busqueda: boolean = false;
  private lineasDirectas: any = [];
  private combinaciones: any = [];
  private tipo: string = '';
  private fecha: string = '';
  private hora: string = '';
  private horariosOrigen: any;
  private horariosDestino: any;
  private ordenHorarioOrigen: number = 0;
  urlParadas: string = 'http://localhost:8000/usuario/busqueda';
  urlResultados: string = 'http://localhost:8000/usuario/origenDestino';
  constructor(private http: HttpClient) {}

  setBusqueda(busqueda: boolean) {
    this.busqueda = busqueda;
  }
  getBusqueda() {
    return this.busqueda;
  }
  getResultados() {
    return this.resultados;
  }
  setParadas(): Observable<any[]> {
    this.paradas = this.http.get<any[]>(this.urlParadas);
    return this.paradas;
  }
  getParadas() {
    return this.paradas;
  }
  setParadaOrigen(parada: any) {
    if (parada != undefined) {
      this.paradaOrigen = {
        idParada: parada.id,
        nombre: parada.nombre,
        latitud: parada.latitud,
        longitud: parada.longitud,
        poblacion: parada.poblacion,
      };
    } else {
      this.paradaOrigen = undefined;
    }
  }
  getParadaOrigen() {
    return this.paradaOrigen;
  }
  setParadaDestino(parada: any) {
    if (parada != undefined) {
      this.paradaDestino = {
        idParada: parada.id,
        nombre: parada.nombre,
        latitud: parada.latitud,
        longitud: parada.longitud,
        poblacion: parada.poblacion,
      };
    } else {
      this.paradaDestino = undefined;
    }
  }
  getParadaDestino() {
    return this.paradaDestino;
  }
  getLineasDirectas() {
    return this.lineasDirectas;
  }
  getCombinaciones() {
    return this.combinaciones;
  }
  getTipo() {
    return this.tipo;
  }
  getHora() {
    return this.hora;
  }
  setFecha(fecha: string) {
    this.fecha = fecha;
  }
  getFecha() {
    return this.fecha;
  }
  buscar(tipo: string, hora: string) {
    this.lineasDirectas = [];
    this.combinaciones = [];
    if (this.paradaOrigen == undefined || this.paradaDestino == undefined)
      return;
    this.http
      .get<any[]>(
        this.urlResultados +
          '?origen=' +
          this.paradaOrigen.idParada +
          '&destino=' +
          this.paradaDestino.idParada
      )
      .subscribe((json: any) => {
        this.resultados = json[0];
        console.log(this.resultados);
        this.tipo = tipo;
        this.hora = hora;
        
        this.setLineasDirectas();

        this.setCombinaciones();

      });
  }
  setLineasDirectas() {
    this.resultados.forEach((linea: any) => {
      linea.direcciones.forEach((direccion: any) => {
        if (
          this.direccionContieneTrayecto(
            direccion,
            this.paradaOrigen.idParada,
            this.paradaDestino.idParada
          )
        ) {
          if (
            this.getHorarioOrigen(
              direccion,
              this.getParadaOrigen(),
              this.getHora()
            ) != undefined
          ) {
            this.lineasDirectas.push({
              idLinea: linea.idLinea,
              linea: linea.linea,
              empresa: linea.empresa,
              idSublinea: linea.idSublinea,
              sublinea: linea.sublinea,
              direccion: direccion.direccion,
              paradaOrigen: this.getParadaOrigen().nombre,
              horarioOrigen: this.getHorarioOrigen(
                direccion,
                this.getParadaOrigen(),
                this.getHora()
              ),
              paradaDestino: this.getParadaDestino().nombre,
              horarioDestino: this.getHorarioDestino(
                direccion,
                this.getParadaDestino()
              ),
            });
          }
        }
      });
    });
  }
  setCombinaciones() {
    let direccionesOrigen: any = [];
    let direccionesDestino: any = [];
    //guardamos las direcciones que contienen la parada de origen, y las que contienen la parada de destino
    this.resultados.forEach((linea: any) => {
      linea.direcciones.forEach((direccion: any) => {
        if (
          this.direccionContieneParada(direccion, this.paradaOrigen.idParada)
        ) {
          direccionesOrigen.push({
            idLinea: linea.idLinea,
            linea: linea.linea,
            empresa: linea.empresa,
            idSublinea: linea.idSublinea,
            sublinea: linea.sublinea,
            direccion: direccion.direccion,
            paradas: direccion.paradas,
          });
        }
        if (
          this.direccionContieneParada(direccion, this.paradaDestino.idParada)
        ) {
          direccionesDestino.push({
            idLinea: linea.idLinea,
            linea: linea.linea,
            empresa: linea.empresa,
            idSublinea: linea.idSublinea,
            sublinea: linea.sublinea,
            direccion: direccion.direccion,
            paradas: direccion.paradas,
          });
        }
      });
    });
    //recorrer todas las direcciones de origen y destino para buscar combinaciones
    direccionesOrigen.forEach((lineaOrigen: any) => {
      let paradaOrigen = this.findParadaByDireccion(
        lineaOrigen,
        this.paradaOrigen.idParada
      );
      direccionesDestino.forEach((lineaDestino: any) => {
        let paradaDestino = this.findParadaByDireccion(
          lineaDestino,
          this.paradaDestino.idParada
        );
        //recorrer todas las paradas de las direcciones de origen y destino para buscar combinaciones
        lineaOrigen.paradas.forEach((paradaLineaOrigen: any) => {
          lineaDestino.paradas.forEach((paradaLineaDestino: any) => {
            //comprobar que la parada en la que vamos a hacer transbordo no sea la parada de origen ni la de destino
            if (
              paradaLineaOrigen.idParada != this.paradaOrigen.idParada &&
              paradaLineaOrigen.idParada !=
                this.paradaDestino
                  .idParada && lineaOrigen.idSublinea != lineaDestino.idSublinea
            ) {
              //en las paradas coincidentes entre las dos lineas, comprobar el orden de las paradas
              if (
                paradaLineaOrigen.idParada == paradaLineaDestino.idParada &&
                paradaLineaOrigen.orden > paradaOrigen.orden &&
                paradaLineaDestino.orden < paradaDestino.orden
              ) {
                //comprobar que existen horarios en las paradas de origen y destino
                if (
                  this.getHorarioOrigen(
                    lineaOrigen,
                    this.paradaOrigen,
                    this.getHora()
                  ) != undefined &&
                  this.getHorarioDestino(lineaOrigen, paradaLineaOrigen) !=
                    undefined &&
                  this.getHorarioOrigen(
                    lineaDestino,
                    paradaLineaDestino,
                    this.getHorarioDestino(lineaOrigen, paradaLineaOrigen)
                  ) != undefined &&
                  this.getHorarioDestino(lineaDestino, this.paradaDestino) !=
                    undefined
                ) {
                  if (this.combinaciones.length != 0) {
                    //si ya hay combinaciones, antes de añadir una nueva, comprobar que no exista ya una combinacion entre las mismas lineas
                    this.combinaciones.forEach((combinacion: any) => {
                      if (
                        lineaOrigen.idSublinea !=
                          combinacion.lineaOrigen.idSublinea &&
                        lineaDestino.idSublinea !=
                          combinacion.lineaDestino.idSublinea
                      ) {
                        this.combinaciones.push({
                          idCombinacion: this.combinaciones.length + 1,
                          lineaOrigen: {
                            idLinea: lineaOrigen.idLinea,
                            linea: lineaOrigen.linea,
                            empresa: lineaOrigen.empresa,
                            idSublinea: lineaOrigen.idSublinea,
                            sublinea: lineaOrigen.sublinea,
                            direccion: lineaOrigen.direccion,
                            paradaOrigen: this.paradaOrigen.nombre,
                            horarioOrigen: this.getHorarioOrigen(
                              lineaOrigen,
                              this.paradaOrigen,
                              this.getHora()
                            ),
                            paradaDestino: paradaLineaOrigen.parada,
                            horarioDestino: this.getHorarioDestino(
                              lineaOrigen,
                              paradaLineaOrigen
                            ),
                          },
                          lineaDestino: {
                            idLinea: lineaDestino.idLinea,
                            linea: lineaDestino.linea,
                            empresa: lineaDestino.empresa,
                            idSublinea: lineaDestino.idSublinea,
                            sublinea: lineaDestino.sublinea,
                            direccion: lineaDestino.direccion,
                            paradaOrigen: paradaLineaDestino.parada,
                            horarioOrigen: this.getHorarioOrigen(
                              lineaDestino,
                              paradaLineaDestino,
                              this.getHorarioDestino(
                                lineaOrigen,
                                paradaLineaOrigen
                              )
                            ),
                            paradaDestino: this.paradaDestino.nombre,
                            horarioDestino: this.getHorarioDestino(
                              lineaDestino,
                              this.paradaDestino
                            ),
                          },
                        });
                      }
                    });
                  } else {
                    this.combinaciones.push({
                      idCombinacion: this.combinaciones.length + 1,
                      lineaOrigen: {
                        idLinea: lineaOrigen.idLinea,
                        linea: lineaOrigen.linea,
                        empresa: lineaOrigen.empresa,
                        idSublinea: lineaOrigen.idSublinea,
                        sublinea: lineaOrigen.sublinea,
                        direccion: lineaOrigen.direccion,
                        paradaOrigen: this.paradaOrigen.nombre,
                        horarioOrigen: this.getHorarioOrigen(
                          lineaOrigen,
                          this.paradaOrigen,
                          this.getHora()
                        ),
                        paradaDestino: paradaLineaOrigen.parada,
                        horarioDestino: this.getHorarioDestino(
                          lineaOrigen,
                          paradaLineaOrigen
                        ),
                      },
                      lineaDestino: {
                        idLinea: lineaDestino.idLinea,
                        linea: lineaDestino.linea,
                        empresa: lineaDestino.empresa,
                        idSublinea: lineaDestino.idSublinea,
                        sublinea: lineaDestino.sublinea,
                        direccion: lineaDestino.direccion,
                        paradaOrigen: paradaLineaDestino.parada,
                        horarioOrigen: this.getHorarioOrigen(
                          lineaDestino,
                          paradaLineaDestino,
                          this.getHorarioDestino(lineaOrigen, paradaLineaOrigen)
                        ),
                        paradaDestino: this.paradaDestino.nombre,
                        horarioDestino: this.getHorarioDestino(
                          lineaDestino,
                          this.paradaDestino
                        ),
                      },
                    });
                  }
                }
              }
            }
          });
        });
      });
    });
  }
  findParadaByDireccion(direccion: any, idParada: number) {
    return direccion.paradas.find((parada: any) => parada.idParada == idParada);
  }
  direccionContieneParada(direccion: any, idParada: number) {
    let contieneParada = false;
    direccion.paradas.forEach((parada: any) => {
      if (parada.idParada == idParada) {
        contieneParada = true;
      }
    });
    return contieneParada;
  }
  direccionContieneTrayecto(
    direccion: any,
    idParadaOrigen: number,
    idParadaDestino: number
  ) {
    let contieneOrigen = false;
    let contieneDestino = false;
    let ordenOrigen = 0;
    let ordenDestino = 0;

    direccion.paradas.forEach((parada: any) => {
      if (parada.idParada == idParadaOrigen) {
        contieneOrigen = true;
        ordenOrigen = parada.orden;
      }
      if (parada.idParada == idParadaDestino) {
        contieneDestino = true;
        ordenDestino = parada.orden;
      }
    });
    return contieneOrigen && contieneDestino && ordenOrigen < ordenDestino;
  }
  getHorarioOrigen(direccion: any, paradaOrigen: any, hora: string) {
    let horarios: any = [];
    direccion.paradas.forEach((parada: any) => {
      if (parada.idParada == paradaOrigen.idParada) {
        parada.horario.forEach((horario: any) => {
          if (horario.tipo == this.getTipo()) {
            horarios.push(horario);
          }
        });
      }
    });
    this.horariosOrigen = this.sortByTime(horarios);
    let horario = this.horariosOrigen.filter((horario: any) => {
      const horarioTime = this.parseTime(horario.hora);
      const horaBusqueda = this.parseTime(hora);

      return (
        horarioTime.hora > horaBusqueda.hora ||
        (horarioTime.hora == horaBusqueda.hora &&
          horarioTime.minuto > horaBusqueda.minuto)
      );
    })[0];

    if (horario == undefined) return undefined;
    else {
      this.ordenHorarioOrigen = this.horariosOrigen.indexOf(horario) + 1;
      return horario.hora;
    }
  }
  getHorarioDestino(direccion: any, paradaDestino: any) {
    let horarios: any = [];
    direccion.paradas.forEach((parada: any) => {
      if (parada.idParada == paradaDestino.idParada) {
        parada.horario.forEach((horario: any) => {
          if (horario.tipo == this.getTipo()) {
            horarios.push(horario);
          }
        });
      }
    });
    this.horariosDestino = this.sortByTime(horarios);
    return this.horariosDestino[this.ordenHorarioOrigen - 1].hora;
  }
  setOrdenHorarioOrigen(orden: number) {
    this.ordenHorarioOrigen = orden;
  }
  getOrdenHorarioOrigen() {
    return this.ordenHorarioOrigen;
  }
  parseTime(timeString: string): { hora: number; minuto: number } {
    const [horaString, minutoString] = timeString.split(':');
    return {
      hora: parseInt(horaString),
      minuto: parseInt(minutoString),
    };
  }
  sortByTime(array: any[]): any[] {
    return array.sort((a: any, b: any) => {
      const timeA = this.parseTime(a.hora);
      const timeB = this.parseTime(b.hora);

      if (timeA.hora < timeB.hora) {
        return -1;
      } else if (timeA.hora > timeB.hora) {
        return 1;
      } else {
        if (timeA.minuto < timeB.minuto) {
          return -1;
        } else if (timeA.minuto > timeB.minuto) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
}
