import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ADDRESS } from '../config/config';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public userProfile : Profile = {} ;

  constructor(private httpClient : HttpClient) { 

  }

  public getProfile(userid : Number): Observable<any>{ 
    return this.httpClient.get<any>(`${ADDRESS}/app/profile/${userid}`, { responseType: 'json'})
      .pipe(
        tap((profile)=>{
          this.userProfile.name = profile.name;
          this.userProfile.age = profile.age;
          this.userProfile.gender = profile.gender;
          this.userProfile.contact = profile.contact;
          this.userProfile.username = profile.username;
          this.userProfile.photourl = profile.photourl;
          this.userProfile.officertype = profile.officertype;
          this.userProfile.photokey = profile.photokey;
      }));
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

  public updatePhoto(userid, oldphotokey, file, fileName){ 
    console.log(`oldphotokey=${oldphotokey}`);
    let formData = new FormData();
    formData.append('profilepic',file, fileName);
    formData.append('photokey', oldphotokey);
    let headers = new HttpHeaders();
    let options : any = { 
      headers: headers,
      responseType: 'json'
    }
    return this.httpClient.post<any>(`${ADDRESS}/app/profile/${userid}/update/picture`,formData,options);

  }

}
