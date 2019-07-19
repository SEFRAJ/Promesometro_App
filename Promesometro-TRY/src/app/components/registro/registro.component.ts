import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
public user: User;
public status;


  constructor(private _router: Router, private _userService: UserService ) { 
    
    this.user = new User(
      "",
      "",
      "",
      "",
      ""
    )
  }

  ngOnInit() {
  }


  registrar(){
    this._userService.registro(this.user).subscribe(
      response=>{
        if(response){
          this.status = 'ok';
          this.user = new User(
            "",
            "",
            "",
            "",
            ""
          )
          this._router.navigate(['/login'])
          console.log(response)
        }
      },
      error=>{
        console.log(<any>error);
        this.status = 'error';
      }
      
    )
  }

}
