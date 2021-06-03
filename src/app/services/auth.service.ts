import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Validity } from '../interfaces/validity';
import { Login } from '../interfaces/login';
import { ADDRESS } from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public loggedIn : boolean;

  constructor(private httpClient : HttpClient) { }
 
  // http request get testing 
  public testGet(): Observable<Validity> {  
    return this.httpClient.get<Validity>(ADDRESS);
  }

  public authUser(login : Login ): Observable<any> { 
    let payload = new HttpParams().set("username",login.username)
      .set("password",login.password);
    let option : any = {
        headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
        responseType: "json"
    } 
    return this.httpClient.post<any>(`${ADDRESS}/app/auth`, payload, option).pipe(
      tap((data: any)=>{ 
        if(data.isValid){
          this.loggedIn = true;
          localStorage.setItem('id', data.id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token',login.username);
        }else{
          this.loggedIn = false;
          console.log("error password or username");
          localStorage.setItem('isLoggedIn', 'false');
        }
      }))
  }

  public logout() :void { 
    localStorage.removeItem('id');
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
  }
}
