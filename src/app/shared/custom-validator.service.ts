import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl ,ValidatorFn, 
  AsyncValidator, AsyncValidatorFn ,Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError, } from 'rxjs/operators';
import { ResidentService } from '../services/resident.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService{

  constructor(private residentService : ResidentService) { }

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
