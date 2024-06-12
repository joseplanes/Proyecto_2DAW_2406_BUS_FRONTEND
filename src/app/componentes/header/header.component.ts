import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  titulo = '';
  selected:boolean = false;
  activarMenu:boolean = false;
  popup:boolean = false;
  constructor(private activatedRoute: ActivatedRoute, protected comunicacionService: ComunicacionService, private autenticacionService: AutenticacionService) {}
  ngOnInit(): void {
     this.titulo =  this.comunicacionService.getTitulo()
     this.activarMenu = false;
  }
  isLogged(){
    return this.autenticacionService.isLoggedIn();
  }
  logOut(){
    this.autenticacionService.logout();
    this.activarMenu = false;
  }
  alternarMenu(){
   this.activarMenu = !this.activarMenu;
  }
  alternarPopup(){
    this.popup = !this.popup;
  }
}
