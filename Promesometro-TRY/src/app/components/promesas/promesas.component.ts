import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClrLoadingState } from '@clr/angular';
import { Promesa } from 'src/app/models/promesas.model';
import { Router } from '@angular/router';
import { PromesasService } from 'src/app/services/promesas.service';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss'],
  providers: [UserService,PromesasService]
})
export class PromesasComponent implements OnInit {

  private name;
  private email;
  private usuario;
  private identity: any;
  public token;
  public id;
  private rol;
  public status: string;
  public voto: Boolean ;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

    //PARTIDOS VARIABLES
    public datos: Promesa[]; //traer
    public datoModel: Promesa; //enviar
    constructor(private _userService : UserService, private _Service : PromesasService,private _router: Router) {
      
      this.identity = this._userService.getIdentity();
      this.email = this.identity.email;
      this.id = this._userService.getIdCandidato();
      this.rol = this.identity.rol;
      this.usuario = this.identity.usuario;
      this.token = this._userService.getToken(); 
      this.datoModel = new Promesa(
        "",
        "",
        "",
        "",
        1,
        0,
        0,
        0,
        []
      )
     }
  
    ngOnInit() {
      this.getDatos();
    }
  
    getDatos(){
      console.log(this.id.nombre)
      this._Service.getDatos(this.token,this.id._id).subscribe(  //el id que manda aqui en realidad es el identity
        response=>{
          if(response.listaPromesas){
            console.log(response.listaPromesas)
            this.datos = response.listaPromesas;
          }        


        },
        error=>{
          var errorMessage = <any>error; 
          console.log(errorMessage); 
          if(errorMessage != null){
            this.status = 'ERROR'
          }
        }
      )
    }
  
    addDato(){
      this.validateBtnState = ClrLoadingState.LOADING;
      this._Service.addDato(this.token,this.id._id,this.datoModel).subscribe(
        response=>{
          if(response){
            this.status = 'ok';
            this.datoModel = new Promesa(
              "",
              "",
              "",
              "",
              1,
              0,
              0,
              0,
              []
            )
            this.getDatos();
            this.validateBtnState = ClrLoadingState.SUCCESS;
            console.log(response)
          }
        },
        error=>{
          console.log(<any>error);
          this.status = 'error';
          this.validateBtnState = ClrLoadingState.SUCCESS;
        }
        
      )
    }
      
    addVoto(id, si , no){
      
      this.validateBtnState = ClrLoadingState.LOADING;
      console.log(this.datoModel)
      this._Service.addVoto(this.token,id,si, no ).subscribe(
        response=>{
          if(response.message === 'Usted ya voto en esta promesa')
          {
            this.status = 'Usted ya voto en esta promesa'
            setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000);
          }else{
              this.status = 'ok';
              this.getDatos();

              console.log(response)
            }
            this.validateBtnState = ClrLoadingState.SUCCESS;
        },
      
        error=>{
          console.log(<any>error);
          this.status = 'error';
          this.validateBtnState = ClrLoadingState.SUCCESS;
        }
        
      )
    }

    eliminarPromesa(id){
      this.validateBtnState = ClrLoadingState.LOADING;
      this._Service.eliminarPromesa(this.token,id).subscribe(
        response=>{
          if(response.message == 'promesa eliminada exitosamente'){
            this.status = 'promesa eliminada exitosamente';
            this.getDatos();

            setTimeout(() => 
            {
              this.status = 'ok'
              },
            2000);

          }else{
            this.status = 'No se pudo eliminar la promesa'
          }

          this.validateBtnState = ClrLoadingState.SUCCESS;

        },
        error=>{
          console.log(<any>error);
          this.status = 'error';
          this.validateBtnState = ClrLoadingState.SUCCESS;
        }
      )
    }

  }
  