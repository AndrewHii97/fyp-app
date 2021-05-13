import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardGuard implements CanLoad {
  
  constructor ( private router : Router ){ }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    console.log("triggered")
    if ( localStorage.getItem('isLoggedIn') === 'true' ){ 
      console.log("already logged in");
      return true;
    }else{
      console.log("have not logged in");
      return this.router.createUrlTree(['/login']);
    }
      
  }
}
