import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ADDRESS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient: HttpClient) { }

  public updateUserToken(token, personid){
    let url = `${ADDRESS}/token` 
    let body = new HttpParams()
      .set('id',personid)
      .set('token', token)
    return this.httpClient.patch(url,body) 
  }
}

