import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { Alert } from '../../interfaces/alert';
import { Security } from '../../interfaces/security'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-alert-pending',
  templateUrl: './alert-pending.component.html',
  styleUrls: ['./alert-pending.component.css']
})
export class AlertPendingComponent implements OnInit {
  public alertlist : MatTableDataSource<Alert>;
  public displayedColumn : string[] = ['issueid','issuedate','issuetime','description','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedAlert;

  @HostListener('document:visibilitychange',['$event'])
  visibilityChange(){
    this.checkHiddenDocument();
  }

  checkHiddenDocument(){
    if (!document.hidden){
      this.getAlertsPending();
    }
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator

  // try to refresh upon refocus for alert to match the alert notification
  constructor(
    private alertService : AlertService 
    ) {}

  ngOnInit(): void {    
    this.getAlertsPending()
  }


  onSelect(alert): void { 
    console.log('selected',alert);
    this.selectedAlert = alert;
  }
  
  approveAlert(alert):void {
    let alertid = alert.alertid;
    this.alertService.approveAlert(alertid).subscribe(
      (res)=>{
        this.getAlertsPending();
      }
    )
  }


  getAlertsPending(): void { 
    this.alertService.getAlertListPending().subscribe(
      (alerts)=>{
        this.alertlist = new MatTableDataSource(alerts);
        this.alertlist.sort = this.sort;
        this.alertlist.paginator = this.paginator;
      }
    )
  }

  deleteAlert(alert):void { 
    let alertid = alert.alertid;
    let photoid = alert.photoid;
    this.alertService.deleteAlert(photoid, alertid).subscribe(
      (res)=>{
        console.log("alert deleted");
        this.getAlertsPending();
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
}