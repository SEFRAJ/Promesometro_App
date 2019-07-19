import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PartidosComponent } from '../partidos/partidos.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
  providers: [UserService]
})
export class EncabezadoComponent implements OnInit {
  private identity: any;

  constructor(private _userService : UserService, private _router: Router) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit() {
  }

  signOff(){

    console.log('eliminacion exitosa',this.identity);
    //console.log('eliminacion exitosa',this.token)
    sessionStorage.clear();
    this.identity = null;
    //this.token = null;
    this._router.navigate(['/login'])
    console.log(this.identity)
    //console.log(this.token)

  }

}
