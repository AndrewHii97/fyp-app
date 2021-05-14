import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public isMenuOpen :boolean = false;
  public contentMargin :number = 240;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onToolbarMenuToggle(){ 
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen){ 
      this.contentMargin = 70;
    } else { 
      this.contentMargin = 240;
    }

  }

  logout(){ 
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
