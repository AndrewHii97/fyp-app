import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { MessagingService } from '../services/messaging.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public officerType = localStorage.getItem('officertype');
  public id : number;
  public name : string;
  public imageUrl : string;
  public isMenuOpen :boolean = false;
  public contentMargin :number = 240;

  constructor(private authService: AuthService,
    private router : Router,
    private profileService : ProfileService,
    private messagingService : MessagingService) { }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    // only accept notification if login succesfully
    this.messagingService.receiveMessage();
    // subscribe to the mesg
    this.messagingService.currentMessage.subscribe((mesg)=>{
      console.log(mesg)
      console.log("seomthing get called ")
    })
    this.id = parseInt(localStorage.getItem('id'));
    this.name = localStorage.getItem('token');
    this.profileService.getProfile(this.id).subscribe(
      (res)=>{
          this.imageUrl = this.profileService.userProfile.photourl;
      },
      (err)=>{
        this.imageUrl = "";
      }
    )
    
  }

  onToolbarMenuToggle(){ 
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
    this.isMenuOpen = false;
  }



}

