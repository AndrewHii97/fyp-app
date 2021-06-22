import { Resident } from '../interfaces/resident';;
import { ADDRESS } from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { Key } from '../interfaces/key';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private httpClient : HttpClient) { }

  public checkResidentIcNo(icno : string): Observable<any>{
    let url = `${ADDRESS}/resident/icno/check`;
    let payload = new HttpParams().set('icno',icno);
    return this.httpClient.post<any>(url,payload,{responseType: 'json'});
  }

  public checkResidentUsername(username: string): Observable<any>{
    let url = `${ADDRESS}/resident/username/check`;
    let payload = new HttpParams().set('username',username);
    return this.httpClient.post<any>(url,payload,{responseType: 'json'});
  }

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

  public approveResident(residentid): Observable<any>{
    let url = `${ADDRESS}/resident/${residentid}/approve`;
    let payload = new HttpParams()
    return this.httpClient.post(url,payload);
  }

  public createResident(resident: Resident): Observable<any>{
    let url = `${ADDRESS}/resident`
    let payload = new HttpParams()
      .set('name', resident.name)
      .set('gender', resident.gender)
      .set('icno', resident.icno)
      .set('address',resident.address)
      .set('contact',resident.contact)
      .set('livingunitid',resident.livingunitid)
      .set('username',resident.username)
      .set('password',resident.password)
      .set('keyid', resident.keyid)
    let options : any = { 
      responseType : 'json'
    }
    return this.httpClient.post(url, payload, options);
  }
// check if image provided fulfill requirement include 
  // 1. single face only
  // 2. not in collection 
  // 3. clear image
  public checkImageUpload(file): Observable<any>{ 
    let url = `${ADDRESS}/resident/image/check`;
    let formData = new FormData();
    formData.append('checkImage',file, file.name);
    let headers = new HttpHeaders();
    let options : any = { 
      headers: headers,
      responseType: 'json'
    }
    return this.httpClient.post<any>(url,formData,options)
  }

  public uploadImage(id, file){
    let url = `${ADDRESS}/resident/image`;
    let formData = new FormData();
    formData.append('image',file, file.name);
    formData.append('id', id);
    let headers = new HttpHeaders();
    let options :any = { 
      headers: headers,
      responseType : 'json'
    }
    return this.httpClient.post<any>(url,formData,options)
  }

  public deleteResident(id): Observable<any>{ 
    let url = `${ADDRESS}/resident/${id}`;
    let options : any = {
      responseType: 'json'
    }
    return this.httpClient.delete<any>(url, options);
  }

  public findKeyOwned(residentId): Observable<Key>{
    let url = `${ADDRESS}/resident/key`;
    let query = new HttpParams().set('id',residentId);
    let options : any = { 
      params: query,
      responseType: 'json'
    }
    return this.httpClient.get<Key>(url, {
      params: query,
      responseType: 'json'
    });
  }

  public updateResident(resident: Resident): Observable<any>{
    let url = `${ADDRESS}/resident/${resident.id}`;
    let payload = new HttpParams()
      .set('name',resident.name)
      .set('gender',resident.gender)
      .set('address',resident.address)
      .set('contact',resident.contact)
      .set('icno',resident.icno)
      .set('livingunitid',resident.livingunitid)
      .set('keyid',resident.keyid)
    let option : any = {
      responseType: 'json'
    }
    return this.httpClient.patch<any>(url,payload,option);
  }

  public getResidentImage(residentid : string): Observable<any>{
    let url =`${ADDRESS}/resident/image`;
    let query = new HttpParams()
      .set('id', residentid);
    return this.httpClient.get<any>(url,{params: query, responseType: 'json'});
  }

  public updateResidentImage(faceid, photopath ,photoid, file){
    let url = `${ADDRESS}/resident/image`;
    let formData = new FormData();
    formData.append('image',file, file.name);
    formData.append('photoid',photoid); // original photoid
    formData.append('photopath',photopath); // original photopath
    formData.append('faceid',faceid);
    let headers = new HttpHeaders();
    let options :any = { 
      headers: headers,
      responseType : 'json'
    }
    return this.httpClient.patch<any>(url,formData,options)

  }

  public getUnreviewedNumber():Observable<any>{
    let url = `${ADDRESS}/resident/unreviewed/total` 
    return this.httpClient.get<any>(url,{responseType: 'json'});
  }
  
}
