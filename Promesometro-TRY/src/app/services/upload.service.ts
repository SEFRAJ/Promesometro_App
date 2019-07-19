import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { XhrFactory } from '@angular/common/http';

@Injectable()
export class UploadService {
  public url: String;

  constructor() {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    return new Promise(function(resolve, reject){
      var formData: any = new FormData(); //form data sera como la ventanita para enviar los datos
      var xhr = new XMLHttpRequest;
      for (var i = 0 ; i< files.length; i++){
        formData.append(name, files[i], files[i].name);
      }      
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))
          }else{
            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token)
      xhr.send(formData)
    })
  }
}
