import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Partido } from '../models/partido.model';
import {GLOBAL} from './global.service';

@Injectable()
export class PartidosService {
  public url: String;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

  addPartido(token,partido: Partido): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(partido);
    
    return this._http.post(this.url+'addPartido',params,{headers: headers})
  }

  getPartidos(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'partidos', {headers:headers})
  }

  eliminarPartido(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
    return this._http.delete(this.url+'eliminar-partido/'+id,{headers: headers})
  }
}
