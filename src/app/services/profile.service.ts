import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADDRESS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient : HttpClient) { 

  }

  public getProfile(userid : Number): Observable<any>{ 
    return this.httpClient.get<any>(`${ADDRESS}/app/profile/${userid}`,
      { 
        responseType: 'json',
      }
    );
  }

  public updateProfile(userid : Number, profile): Observable<any> { 
    let payload = new HttpParams()
      .set('name',profile.name)
      .set('age',profile.age)
      .set('gender',profile.gender)
      .set('contact',profile.contact)
      .set('username',profile.username);
    let headers = new HttpHeaders()
      .set('Content-Type','application/x-www-form-urlencoded')
    let option : any = { 
      headers: headers,
      responseType: "json"
    }
    return this.httpClient.post<any>(`${ADDRESS}/app/profile/${userid}/update/profile`,payload, option);
  }

  public updatePassword(userid : Number, password : {new : string; old : string}): Observable<any>{ 
    let payload = new HttpParams()
      .set('oldPassword', password.new)
      .set('newPassword', password.old);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options : any = { 
      headers: headers,
      responseType: 'json'
    }
    return this.httpClient.post<any>(`${ADDRESS}/app/profile/${userid}/update/password`,payload,options);

  }

  public updatePhoto(userid, file, fileName){ 
    let formData = new FormData();
    formData.append('profilepic',file, fileName);
    let headers = new HttpHeaders();
    let options : any = { 
      headers: headers,
      responseType: 'json'
    }
    return this.httpClient.post<any>(`${ADDRESS}/app/profile/${userid}/update/picture`,formData,options);

  }

}
