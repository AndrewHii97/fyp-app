import { MessagingService } from '../services/messaging.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { Alert } from '../interfaces/alert';
import { Security } from '../interfaces/security';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public alertlist : MatTableDataSource<Alert>;
  public displayedColumn : string[] = ['issueid','issuedate','issuetime','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedAlert;
  public message;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator

  // try to refresh upon refocus for alert to match the alert notification
  constructor(private messagingService: MessagingService,
    private alertService : AlertService 
    
    ) {
    document.addEventListener("visibilitychange", function () {
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

  ngOnInit(): void {
    this.messagingService.currentMessage.subscribe((mesg) => {
      console.log(mesg);
      this.message = mesg;
    })
    this.getAlerts();

  }


  onSelect(alert): void { 
    this.selectedAlert = alert;
  }
  

  getAlerts(): void { 
    this.alertService.getAlertList().subscribe(
      (alerts)=>{
        console.log(alerts);
        this.alertlist = new MatTableDataSource(alerts);
        this.alertlist.sort = this.sort;
        this.alertlist.paginator = this.paginator;
      }
    )
  }

  deleteKey(key):void { 

  }

  applyFilter():void { 
    this.alertlist.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() : void { 
    this.searchKey = "";
    this.applyFilter();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.alertlist.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }
}
