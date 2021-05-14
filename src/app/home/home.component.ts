import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  changeContent(selected: any):void { 
    let dir = selected.selectedOptions.selected[0]?.value;
    // add this.router to navigate to respective component
    switch(dir) {
      case "Dashboard":
        console.log("route to dashboard");
        break;
      case "Alert":
        console.log("route to alert");
        break;
      case "Resident":
        console.log("route to resident");
        break;
      case "Key": 
        console.log("route to key");
        break;
      case "Visitor":
        console.log('route to visitor');
        break;
      case "HousingUnit":
        console.log('route to housing unit');
        break;
      case "Security":
        console.log('route to Security');
        break;
      case "Setting": 
        console.log("route to Setting");
        break;
    }
    this.isMenuOpen = false;

  }



}

