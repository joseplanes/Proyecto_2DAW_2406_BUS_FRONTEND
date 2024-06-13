import { Component, Input } from '@angular/core';
import { AdminService } from '../../servicios/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-linea-borrada',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-linea-borrada.component.html',
  styleUrl: './admin-linea-borrada.component.css'
})
export class AdminLineaBorradaComponent {
  @Input() lineaBorrada: any;
  popup: boolean = false;
  constructor(private adminService: AdminService, private router: Router) {
  }
  recuperarLinea() {
    this.adminService.recuperarLinea(this.lineaBorrada.id).subscribe((data) => {
    });
  }
  alternarPopup(){
    this.popup = !this.popup;
  }
}
