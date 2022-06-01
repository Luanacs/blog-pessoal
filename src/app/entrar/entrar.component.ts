import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }
  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp:UsuarioLogin) =>{
      this.usuarioLogin=resp
    })

  }

}
