import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ADDRESS } from '../config/config';
import { Security } from '../interfaces/security';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  public checkSecurityUsername(username: string):Observable<any> { 
    let url = `${ADDRESS}/security/username/check`;
    let payload = new HttpParams().set('username',username);
    return this.httpClient.post<any>(url, payload);
  }

  public getSecurityList(): Observable<any> { 
    let url = `${ADDRESS}/security`;
    return this.httpClient.get<any>(url);
  }

  public createNewSecurity(security: Security): Observable<any>{ 
    let url = `${ADDRESS}/security`;
    let payload  = new HttpParams()
      .set('securityname',security.securityname)
      .set('gender',security.gender)
      .set('contact',security.contact)
      .set('username',security.username)
      .set('password',security.password)
      .set('officertype',security.officertype)
    return this.httpClient.post<any>(url,payload);
  }


  public updateSecurity(security: Security): Observable<any>{
    let id = security.id
    let url = `${ADDRESS}/security/${id}/update`
    let payload = new HttpParams()
    .set('securityname',security.securityname)
    .set('gender',security.gender)
    .set('officertype',security.officertype)
    .set('contact',security.contact);
    return this.httpClient.patch<any>(url,payload);
  }

  // used for both create and update 
  public updateProfilePhoto(securityid, file, filename): Observable<any>{
    let url = `${ADDRESS}/security/${securityid}/image`
    let payload = new FormData();
    payload.append('profilepic',file,filename);
    payload.append('securityid',securityid);
    return this.httpClient.patch<any>(url,payload)
  } 

  public deleteSecurity(securityid): Observable<any> {
    let url = `${ADDRESS}/security/${securityid}`;
    return this.httpClient.delete<any>(url);
  }

  public getSecurityImage(securityid): Observable<any>{
    let url = `${ADDRESS}/security/${securityid}/image`;
    return this.httpClient.get<any>(url);
  }
}
