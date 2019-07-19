import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Candidato } from '../models/candidato.model';
import {GLOBAL} from './global.service';

@Injectable()
export class CandidatosService {
  public url: String;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

  addCandidato(token,id,candidato: Candidato): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(candidato);
    
    return this._http.post(this.url+'candidato/'+id,params,{headers: headers})
  }
  getCandidatos(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);;
    return this._http.get(this.url+'candidatos/'+id, {headers:headers})
  }

  eliminarCandidato(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
    return this._http.delete(this.url+'eliminar-candidato/'+id,{headers: headers})
  }
  
}
