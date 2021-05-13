import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private navBar: Boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  public logOut(): void{
    this.authService.logout();
    console.log("log out successful");
    this.router.navigate(['/login']);
  }

  public openNav(): void{ 
    this.navBar = true;
  }

  public closeNav(): void{
    this.navBar = false;
  }

  public checkNav(): any{
    if( this.navBar === true ){ 
      return { 
        "width":"250px",
      }
    }
  }

}
