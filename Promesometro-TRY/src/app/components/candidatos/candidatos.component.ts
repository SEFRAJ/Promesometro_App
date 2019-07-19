import { Component, OnInit } from '@angular/core';
import { CandidatosService } from 'src/app/services/candidatos.service';
import { ClrLoadingState } from '@clr/angular';
import { Candidato } from 'src/app/models/candidato.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss'],
  providers:[CandidatosService, UserService,UploadService]
})
export class CandidatosComponent implements OnInit {
  private name;
  private email;
  private rol;
  private usuario;

  public url;
  public idCandidato: String;
  private identity: any;
  public token;
  public id;
  public status: string;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

    //PARTIDOS VARIABLES
    public datos: Candidato[]; //traer
    public datoModel: Candidato; //emviar
    constructor(private _userService : UserService, private _Service : CandidatosService,private _router: Router,private _uploadService: UploadService) {
      
      this.identity = this._userService.getIdentity();
      this.email = this.identity.email;
      this.usuario = this.identity.usuario;
      this.id = this._userService.getId();
      this.rol = this.identity.rol;
      this.token = this._userService.getToken(); 
      this.datoModel = new Candidato(
        "",
        "",
        "",
        "",
        "",
        ""
      )
      this.url = GLOBAL.url;
     }
  
    ngOnInit() {
      this.getDatos();
    }
  
    getDatos(){
      console.log(this.id.nombre)
      this._Service.getCandidatos(this.token,this.id._id).subscribe(
        response=>{
          if(response.listaCandidatos){
            console.log(response.listaCandidatos)
            this.datos = response.listaCandidatos;
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
      this._Service.addCandidato(this.token,this.id._id,this.datoModel).subscribe(
        response=>{
          if(response){
            this.status = 'ok';
            this.datoModel = new Candidato(
              "",
              "",
              "",
              "",
              "",
              ""
            )
            this.getDatos();
            this.validateBtnState = ClrLoadingState.SUCCESS;
            console.log(response)
          }
        },
        error=>{
          console.log(<any>error);
          this.status = 'error';
        }
        
      )
    }
    Redi(id, nombre, descripcion, imagen, cargo){
      console.log(id)
      this.datoModel = new Candidato(
        id,
        nombre,
        descripcion,
        cargo,
        this.id._id,
        imagen,

      )
      sessionStorage.setItem('idCandidato', JSON.stringify(this.datoModel));
      this.status = 'OK';
      this._router.navigate(['/promesas'])
      this.datoModel = new Candidato(
        "",
        "",
        "",
        "",
        "",
        ""
      )
    }
  
    idC(id){
      this.idCandidato = id;
      console.log(this.idCandidato);
    }
  
    imagenCandidato(){
      this._uploadService.makeFileRequest(this.url+'subir-imagen-candidato/'+this.idCandidato,[],this.fileToUpload,this.token,'image')
      .then((result: any)=>{
        console.log(result);
        this.getDatos();
      }  
      )
    }
  
    public fileToUpload: Array<File>
    fileChangeEvent(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files;
    }

    eliminarCandidato(id){
      this.validateBtnState = ClrLoadingState.LOADING;
      this._Service.eliminarCandidato(this.token,id).subscribe(
        response=>{
          if(response.message == 'eliminacion exitosa del candidato'){
            this.status = 'eliminacion exitosa del candidato';
            this.getDatos();

            setTimeout(() => 
            {
              this.status = 'ok'
              },
            2000);

          }else{
            this.status = 'No se pudo eliminar el candidato'
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
  