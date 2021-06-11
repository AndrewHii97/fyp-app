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
    console.log(url);

    return this.httpClient.get<Alert[]>(url);
  }
}
