import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl , AsyncValidatorFn } from '@angular/forms';
import { ResidentService } from '../services/resident.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError, } from 'rxjs/operators'
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private residentService: ResidentService,
    private securityService: SecurityService) { }

  securityUsernameValidation(): AsyncValidatorFn{
    console.log('return async function for username validator security')
    return (ctrl : AbstractControl): Observable <ValidationErrors| null> =>{
      return this.securityService.checkSecurityUsername(ctrl.value).pipe(
        map( res => {
          return res.duplicate? {duplicateUsername: true}: null
        }),
        catchError(()=> null) // error handling method
      )
    }
  }

  icNoValidation(): AsyncValidatorFn{
    console.log('return async function for icno validator')
    return (ctrl : AbstractControl): Observable< ValidationErrors | null> =>{ 
      return this.residentService.checkResidentIcNo(ctrl.value).pipe(
        map( res => {
          console.log('inside icno validation',res);
          return res.duplicate? {duplicateIcno: true}: null
        }),
        catchError(() => null) // error handling method
      )
    }
  }

  // resident user validation
  userNameValidation(): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.residentService.checkResidentUsername(control.value).pipe(
        map( res=>(res.duplicate? {duplicateUser: true}: null )),
        catchError(()=> null)
      );
    }
  }

}
