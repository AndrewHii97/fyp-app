import { MessagingService } from '../services/messaging.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { Alert } from '../interfaces/alert';
import { Security } from '../interfaces/security';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public alertlist : MatTableDataSource<Alert>;
  public displayedColumn : string[] = ['alertid','alertdate','alerttime','description','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedAlert: Alert;
  public message;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator

  @HostListener('document:visibilitychange',['$event'])
  visibilityChange(){
    this.checkHiddenDocument();
  }

  checkHiddenDocument(){
    if (!document.hidden){
      this.getAlerts()
    }
  }
  // try to refresh upon refocus for alert to match the alert notification
  constructor(private messagingService: MessagingService,
    private alertService : AlertService 
    ) {
  }

  ngOnInit(): void {
    this.messagingService.currentMessage.subscribe((mesg) => {
      console.log(mesg);
      this.message = mesg;
    })
    this.getAlerts();

  }


  onSelect(alert): void { 
    console.log('selected',alert);
    this.selectedAlert = alert;
  }
  

  getAlerts(): void { 
    this.alertService.getAlertList().subscribe(
      (alerts)=>{
        this.alertlist = new MatTableDataSource(alerts);
        this.alertlist.sort = this.sort;
        this.alertlist.paginator = this.paginator;
        this.alertlist.filterPredicate = (data, filter)=>{
          let match;
          if (this.categorySelected){ 
            return data[this.categorySelected].toString().toLowerCase().includes(filter);
          }else{ 
            return this.displayedColumn.some(ele => {
              if (typeof data[ele] === 'number'){
                return match = data[ele] === parseInt(filter);
              }else if ( typeof data[ele] === 'string'){
                return match = data[ele].toLowerCase().includes(filter);
              }
            })
          }
        }
      }
    )
  }

  deleteAlert(alert):void { 
    let alertid = alert.alertid;
    let photoid = alert.photoid;
    this.alertService.deleteAlert(photoid, alertid).subscribe(
      (res)=>{
        console.log("alert deleted");
        this.getAlerts();
      }
    )
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

  tabSelectionChange(event){
    if(event.tab.textLabel = "Reviewed"){
      this.getAlerts()
    }
  }
}
