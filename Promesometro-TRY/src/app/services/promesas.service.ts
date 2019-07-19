import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GLOBAL} from './global.service';
import { Promesa } from '../models/promesas.model';

@Injectable()
export class PromesasService {
  public url: String;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

  addDato(token,id,data: Promesa): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(data);
    
    return this._http.post(this.url+'promesa/'+id,params,{headers: headers})
  }
  getDatos(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);;
    return this._http.get(this.url+'promesas/'+id, {headers:headers})
  }
  
  addVoto(token,id, si, no): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
    return this._http.put(this.url+'votar/'+id,{si, no},{headers: headers})
  }

  eliminarPromesa(token,id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
    return this._http.delete(this.url+'eliminar-promesa/'+id,{headers: headers})
  }
  
}