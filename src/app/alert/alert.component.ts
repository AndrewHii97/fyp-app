import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public message ;

  // try to refresh upon refocus for alert to match the alert notification
  constructor( private messagingService: MessagingService) {
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        //do whatever you want
        console.log("Hidden");
      }
      else {
        //do whatever you want
        console.log("SHOWN");
      }
});
   }

  ngOnInit(): void {``
    this.messagingService.currentMessage.subscribe((mesg)=>{
      console.log(mesg);
      this.message = mesg;
    })
    
  }

}
