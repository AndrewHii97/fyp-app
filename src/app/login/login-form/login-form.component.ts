import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public loginError = false; // set LoginError to false by default
  
  form: FormGroup = this.fb.group({
    "username": ["",Validators.required],
    "password": ["",Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router) { }

  public checkLoggedIn(): void{ 
    if(localStorage.getItem("isLoggedIn") === "true"){ 
      this.router.navigate(["/home"]);
    }
  }

  public ngOnInit(): void {
    this.checkLoggedIn();
  }

  public onSubmit(){
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
    this.authService.authUser({
      username:username,
      password:password
    }).subscribe((response: any)=>{
      if(response.isValid){ 
        this.router.navigate(['/home/dashboard']);
      }else{ 
        this.loginError = true ;
        this.form.reset();
      }
    });
  }

  // make the border red in case of error 
  public inputStyle(){ 
    let cl; 
    if(this.loginError){ 
      cl = { 
        'input': true,
        'error-border': true
      }
    }else{ 
      cl = { 
        'input': true,
        'error-border': false,
      }
    }
    return cl;
  }

  public showMessage(){ 
    let cl;
    if(this.loginError){ 
      cl= { 
        'not-visible': false,
        'error-text': true
      }
    }else{
      cl= { 
        'not-visible': true,
        'error=text' : false
      }
    }
    return cl;
  }

}
