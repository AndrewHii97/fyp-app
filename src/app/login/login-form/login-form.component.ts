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
    this.authService.authUser({
      username:this.form.controls.username.value,
      password:this.form.controls.password.value
    }).subscribe((response: any)=>{
      if(response.isValid){ 
      this.router.navigate(['/home']);
    }
    });
  }

}
