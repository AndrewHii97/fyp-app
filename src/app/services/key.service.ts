import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ADDRESS } from '../config/config';
import { Observable } from 'rxjs';
import { Key } from '../interfaces/key';
import { NgStyle } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KeyService {


  constructor(private httpClient: HttpClient) { }

  public getKeyList(): Observable<Key[]>{ 
    let url = `${ADDRESS}/key/list`;
    return this.httpClient.get<Key[]>(url);
  }

  // include query for livingunit
  public getKeyQuery(livingunitid: string):Observable<Key[]>{
    let url = `${ADDRESS}/key`
    let params = new HttpParams()
      .set('livingunitid',livingunitid);
    let options : any = {
      responseType : 'json',
      params: params
    }
    return this.httpClient.get<Key[]>(url,{ 
      params: params,
      responseType: 'json'
    });

  }

  public newKey(keyvalue: string, livingunitid: string): Observable<any>{
    let url = `${ADDRESS}/key/new`;
    let payload = new HttpParams()
      .set('keyvalue',keyvalue)
      .set('livingunitid',livingunitid);
    let option :any = {
      responseType: 'json'
    }
    return this.httpClient.post<any>(url,payload,option);
  }

  public deleteKey(id: string):Observable<any>{ 
    let url = `${ADDRESS}/key/${id}`;
    let option: any = {
      responseType: 'json'
    }
    return this.httpClient.delete<any>(url,option);
  }

  public updateKey(keyid: string, keyvalue: string, livingunitid: string): Observable<any>{
    let url = `${ADDRESS}/key`;
    let payload = new HttpParams()
      .set('keyid',keyid) 
      .set('keyvalue',keyvalue)
      .set('livingunitid',livingunitid)
    let option: any = { 
      responseType: 'json'
    }
    return this.httpClient.patch<any>(url, payload, option);
  }




}
