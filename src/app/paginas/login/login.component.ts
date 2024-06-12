import { Component } from '@angular/core';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  titulo = 'Iniciar Sesión'
  username = '';
  password = '';
  credencialesIncorrectas: boolean = false;
  constructor(private comunicacionService: ComunicacionService, private autenticacionService: AutenticacionService) { 
    this.comunicacionService.setTitulo(this.titulo);
  }
  passwordEnter(event: any){
    if(event.keyCode === 13){
      this.login();
    }
  }
  login(){
      this.autenticacionService.login({username: this.username, password: this.password}).subscribe(
        data => {
          
        }
      );
  }
}
