import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChange } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from '../../interfaces/alert';


@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.css']
})
export class AlertDetailComponent implements OnInit,OnChanges {

  @Input() selectedAlert;
  @Input() showButton : boolean = false;
  recognizedFace = []; 
  oriImageUrl : string ;
  loading : boolean = false;
  facesNotFound : boolean = false;
  @Output() actionEvent = new EventEmitter<string>(); 

  constructor(private alertService: AlertService ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.selectedAlert) {
      this.getUrlAlert();
      this.getFaceInAlert();
    }
  }

  getUrlAlert(): void{ 
    this.loading = true;
    this.alertService.getAlertImageUrl(this.selectedAlert.photoid).subscribe(
     (urlJson)=>{
       this.loading = false;
        this.oriImageUrl = urlJson.imageurl 
     }

    )
  }

  getFaceInAlert(): void{ 
    this.recognizedFace = [];
    this.alertService.getAlertFace(this.selectedAlert.alertid).subscribe(
      (res)=>{
        if(res.length == 0){
          this.facesNotFound = true;
        }else{
          this.recognizedFace = res;
          this.facesNotFound = false;
        }
      }
    )
  }

  checkAlert(alert):void{
    let alertid = alert.alertid;
    this.alertService.approveAlert(alertid).subscribe(
      (res)=>{
        console.log("alert checked");
        this.actionEvent.emit('check');
        this.selectedAlert = null;
        this.oriImageUrl = null;
        this.recognizedFace = [];
      }
    )
  }

  checkAsFalseAlert(alert):void{
    let alertid = alert.alertid;
    this.alertService.approveAlertAsFalse(alertid).subscribe(
      (res)=>{
        console.log("alert check as false alert");
        this.actionEvent.emit('checkAsFalse');
        this.selectedAlert = null;
        this.oriImageUrl = null;
        this.recognizedFace = [];
      }
    )
  }

  deleteAlert(alert):void { 
    let alertid = alert.alertid;
    let photoid = alert.photoid;
    this.alertService.deleteAlert(photoid, alertid).subscribe(
      (res)=>{
        console.log("alert deleted");
        this.actionEvent.emit('delete')
        this.selectedAlert = null;
        this.oriImageUrl = null;
        this.recognizedFace = [];
      }
    )
  }

}
