import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Validity } from '../interfaces/validity';
import { Login } from '../interfaces/login';
import { TEST_ADD as ADDRESS } from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public loggedIn : boolean;
  public model: Login = { username: "admin", password: "admin@123"}; // test stub to compare with

  constructor(private httpClient : HttpClient) { }
 
  // http request get testing 
  public testGet(): Observable<Validity> {  
    return this.httpClient.get<Validity>(ADDRESS);
  }

  public authUser(login : Login ): Observable<any> { 
    let option : any = {
        responseType: "json" 
    } 
    return this.httpClient.post<any>(`${ADDRESS}/auth`, login, option).pipe(
      tap((data: any)=>{ 
        if(data.isValid){
          this.loggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token',login.username)
        }else{
          this.loggedIn = false;
          console.log("error password or username");
          localStorage.setItem('isLoggedIn', 'false');
        }
      }))
  }

  public logout() :void { 
    localStorage.setItem('isLoggedIn','false')
    localStorage.removeItem('token');
  }
}
