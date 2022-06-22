import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioLogin: UsuarioLogin=new UsuarioLogin();
  idUser =environment.id;

  confirmarSenh: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.authService.refreshToken();
    this.idUser=environment.id;
    this.findByIdUsuario(this.idUser);
  }

  confirmSenha(event: any) {
    this.confirmarSenh = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }
  atualizar(){
    this.usuario.tipo=this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenh){
      alert('A senha está incorreta!')
    } else {
      this.authService.putUsuario(this.usuario).subscribe({
        next: (resp: Usuario)=>{
          this.usuario=resp;
          this.usuarioLogin.usuario=this.usuario.usuario;
          this.usuarioLogin.senha=this.confirmarSenh;

          console.log('Depois: '+this.usuario)
          environment.token='';
          environment.id=0;
          environment.nome='';
          environment.foto='';
          this.router.navigate(['/entrar'])
          alert('Usuario atualizado com sucesso')
        },
        error: err=>console.log(err)
      })
    }
  }

  
  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe({
      next: (resp: Usuario)=>{
        this.usuario=resp;
        this.usuario.senha=''
      },
      error: err=>console.log(err)
    })
  }

}
