import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from '../../interfaces/alert';


@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.css']
})
export class AlertDetailComponent implements OnInit,OnChanges {

  @Input() selectedAlert : Alert;
  recognizedFace = []; 
  oriImageUrl : string ;
  loading : boolean = false;
  facesNotFound : boolean = false;

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
}
