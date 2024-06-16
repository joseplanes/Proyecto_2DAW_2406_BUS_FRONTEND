import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { AdminService } from '../../servicios/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-linea',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-linea.component.html',
  styleUrl: './admin-linea.component.css'
})
export class AdminLineaComponent{
  @Input() linea: any;
  popup: boolean = false;
  @Output() lineaBorrada: any = new EventEmitter<boolean>();
  constructor(private adminService: AdminService, private router: Router) {
    
   }
  borrarLinea() {
    this.adminService.borrarLinea(this.linea.id).subscribe((data) => {
      this.lineaBorrada.emit();
    });
  }
  alternarPopup(){
    this.popup = !this.popup;
  }

}
