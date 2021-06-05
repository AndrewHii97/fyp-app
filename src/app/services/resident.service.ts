import { Resident } from '../interfaces/resident';;
import { ADDRESS } from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private httpClient : HttpClient) { }

  public getResident(approved: string): any{ 
    let url = `${ADDRESS}/resident`;
    let query = new HttpParams().set('approved',approved);
    // return Observable to an array of Resident information 
    let options: any = { 
      params: query,
      responseType: 'json'
    }
    return this.httpClient.get(url, options);
  }

  public createResident(resident: Resident): Observable<any>{
    let url = `${ADDRESS}/resident`
    console.log(resident);
    let payload = new HttpParams()
      .set('name', resident.name)
      .set('gender', resident.gender)
      .set('icno', resident.icno)
      .set('address',resident.address)
      .set('contact',resident.contact)
      .set('livingunitid',resident.livingunitid)
      .set('username',resident.username)
      .set('password',resident.password)
    let options : any = { 
      responseType : 'json'
    }
    return this.httpClient.post(url, payload, options);
  }
  
}
