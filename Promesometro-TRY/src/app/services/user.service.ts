import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';
import {GLOBAL} from './global.service';

@Injectable()
export class UserService {
  public url: String;
  public identity;
  public token;


  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  registro(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');  //si le quiero setear mas solo pongo mas .set()

    return this._http.post(this.url+'registrar',params,{headers: headers})
  }
  
  login(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.getToken = gettoken;
    }
    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'login',params,{headers: headers})
  }

    // var identity va a tener el rol usuario etc el usuario logeado los datos del usuario logeado
    getIdentity(){
      var identity2 = JSON.parse(sessionStorage.getItem('identity'))
      if(identity2 != 'undefined'){
        this.identity = identity2;
      }else{
        this.identity = null;
      }
      return this.identity;
    }
    getId(){
      var identity2 = JSON.parse(sessionStorage.getItem('id'))
      if(identity2 != 'undefined'){
        this.identity = identity2;
      }else{
        this.identity = null;
      }
      return this.identity;
    }
    getIdCandidato(){
      var identity2 = JSON.parse(sessionStorage.getItem('idCandidato'))
      if(identity2 != 'undefined'){
        this.identity = identity2;
      }else{
        this.identity = null;
      }
      return this.identity;
    }

    getToken(){
      var token2 = sessionStorage.getItem('token')
      if(token2 != 'undefined'){
        this.token = token2;
      }else{
        this.token = null;
      }
      return this.token;
    }
}
