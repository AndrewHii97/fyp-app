import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ADDRESS } from '../config/config';
import { Observable } from 'rxjs';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private httpClient: HttpClient) { }
  
  getAlertList() : Observable<Alert[]>{ 
    let url = `${ADDRESS}/alert/alertList`;
    return this.httpClient.get<Alert[]>(url);
  }

  getAlertImageUrl(imageid): Observable<any>{ 
    let url = `${ADDRESS}/alert/${imageid}/image`
    return this.httpClient.get<any>(url)
  }

  getAlertFace(alertid):Observable<any>{
    let url = `${ADDRESS}/alert/personInAlert`
    let params = new HttpParams()
      .set('alertid',alertid)
    return this.httpClient.get<any>(url,{params: params});
  }

  getAlertListPending(): Observable<Alert[]>{
    let url = `${ADDRESS}/alert/alertListPending`;
    return this.httpClient.get<Alert[]>(url);
  }

  approveAlert(id): Observable<any>{
    let url = `${ADDRESS}/alert/${id}`
    let body = new HttpParams();
    return this.httpClient.patch<any>(url,body);
  }

  deleteAlert(photoid,alertid): Observable<any>{
    let url = `${ADDRESS}/alert/${alertid}/${photoid}`
    return this.httpClient.delete<any>(url);
  }
}
