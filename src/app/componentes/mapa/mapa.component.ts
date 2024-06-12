import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const iconRetinaUrl = '../../../assets/imagenes/leaflet/marker-icon-2x.png';
const iconUrl = '../../../assets/imagenes/leaflet/marker-icon.png';
const shadowUrl = '../../../assets/imagenes/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.configurarMapa();
    }, 0);
  }
  @Input() id: any;
  mapa: any;
  @Input() paradas: any;
  @Input() recorrido: any;

  configurarMapa() {
    this.mapa = L.map(this.id).setView([37.9815, -1.1277], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.mapa);
    this.recorrido.forEach((punto: any, index: any) => {
      if (index > 0) {
        const puntoAnterior = this.recorrido[index - 1];
        const puntoActual = punto;
        const ruta = L.polyline(
          [
            [puntoAnterior.latitud, puntoAnterior.longitud],
            [puntoActual.latitud, puntoActual.longitud],
          ],
          { color: '#06D6A0', weight: 5 }
        ).addTo(this.mapa);
      }
    });
    this.paradas.forEach((parada: any) => {
      L.marker([parada.coordenadas[0].latitud, parada.coordenadas[0].longitud])
        .addTo(this.mapa)
        .bindPopup(`<b>${parada.parada}</b>`);
    });
  }
}
