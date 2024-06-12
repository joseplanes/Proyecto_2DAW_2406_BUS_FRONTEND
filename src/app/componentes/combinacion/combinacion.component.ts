import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-combinacion',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './combinacion.component.html',
  styleUrl: './combinacion.component.css'
})
export class CombinacionComponent {
  @Input() combinacion:any;
  expandir = false
  expandirParadas(){
    this.expandir = !this.expandir
  }
}
