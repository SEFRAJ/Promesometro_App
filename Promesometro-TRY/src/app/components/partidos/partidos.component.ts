import { Component, OnInit } from '@angular/core';
import { PartidosService } from 'src/app/services/partidos.service';
import { Partido } from 'src/app/models/partido.model';


import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global.service';

import { UserService } from 'src/app/services/user.service';
import { ClrLoadingState } from '@clr/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
  providers:[UserService,PartidosService,UploadService]
})
export class PartidosComponent implements OnInit {
  private name;
  private email;
  private rol;
  private usuario;
  
  public url;
  public idPartido: String;
  private identity: any;
  public token;
  public status: string;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

    //PARTIDOS VARIABLES
    public partidos: Partido; //traer
    public partidoModel: Partido; //emviar


  constructor(private _userService : UserService, private _partidoService : PartidosService,private _router: Router,private _uploadService: UploadService) {
    this.identity = this._userService.getIdentity();
    this.email = this.identity.email;
    this.rol = this.identity.rol;
    this.usuario = this.identity.usuario;

    this.token = this._userService.getToken(); 
    this.partidoModel = new Partido(
      "",
      "",
      "",
      ""
    )
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    this.getLPartidos();
  }

  getLPartidos(){
    this._partidoService.getPartidos().subscribe(
      response=>{
        if(response.listaPartidos){
          console.log(response.listaPartidos)
          this.partidos = response.listaPartidos;
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

  addPartido(){
    this.validateBtnState = ClrLoadingState.LOADING;
    this._partidoService.addPartido(this.token,this.partidoModel).subscribe(
      response=>{
        if(response){
          this.status = 'ok';
          this.partidoModel = new Partido(
            "",
            "",
            "",
            ""
          )
          this.getLPartidos();
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
  Redi(id, nombre, descripcion, imagen){
    console.log(id)
    this.partidoModel = new Partido(
      id,
      nombre,
      descripcion,
      imagen
    )
    sessionStorage.setItem('id', JSON.stringify(this.partidoModel));
    this.status = 'OK';
    this._router.navigate(['/candidatos'])
    this.partidoModel = new Partido(
      "",
      "",
      "",
      ""
    )
  }

  idP(id){
    this.idPartido = id;
    console.log(this.idPartido);
  }

  imagenPartido(){
    this._uploadService.makeFileRequest(this.url+'subir-imagen-partido/'+this.idPartido,[],this.fileToUpload,this.token,'image')
    .then((result: any)=>{
      console.log(result);
      this.getLPartidos();
    }  
    )
  }

  public fileToUpload: Array<File>
  fileChangeEvent(fileInput: any){
  this.fileToUpload = <Array<File>>fileInput.target.files;
  }


  eliminarPartido(id){
    this.validateBtnState = ClrLoadingState.LOADING;
    this._partidoService.eliminarPartido(this.token,id).subscribe(
      response=>{
        if(response.message == 'eliminacion exitosa del partido'){
          this.status = 'eliminacion exitosa del partido';
          this.getLPartidos();

          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000);

        }else{
          this.status = 'No se pudo eliminar el partido'
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
