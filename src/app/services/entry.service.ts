import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ADDRESS } from '../config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private httpClient : HttpClient) { }

  // get list of entries 
  public getEntryList(): Observable<any>{
    let url = `${ADDRESS}/entry/entryList`
    return this.httpClient.get<any>(url);
  }

  public getEntryImageUrl(photopath):Observable<any>{ 
    let url = `${ADDRESS}/entry/${photopath}/image`;
    return this.httpClient.get<any>(url);
  }

  public getEntryFace(personid):Observable<any>{
    let url = `${ADDRESS}/entry/${personid}/person`;
    return this.httpClient.get<any>(url)
  }

  public deleteEntry(entryid,photopath,photoid):Observable<any>{
    let url = `${ADDRESS}/entry/${entryid}`
    let params = new HttpParams().set('photopath',photopath).set('photoid',photoid);
    return this.httpClient.delete<any>(url,{params:params});
  }

}
