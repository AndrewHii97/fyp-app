import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../services/resident.service';
import { AlertService } from '../services/alert.service';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  noOfAlertUnreviewed : number; 
  noOfResidentUnapproved : number; 
  latestEntry;
  entryUrl;
  latestAlert;
  alertUrl;

  constructor(
    private residentService: ResidentService,
    private alertService : AlertService ,
    private entryService : EntryService
    ) { }

  ngOnInit(): void {
    this.getUnreviewdResidentNumber();
    this.getUncheckedAlertNumber();
    this.getLatestAlertDetail();
    this.getLatestEntryDetail();
  }

  getUnreviewdResidentNumber(): void{ 
    this.residentService.getUnreviewedNumber().subscribe((res)=>{
      this.noOfResidentUnapproved = res.count;
    })
  }

  getUncheckedAlertNumber(): void{
    this.alertService.getAlertUncheckedTotal().subscribe((res)=>{
      this.noOfAlertUnreviewed = res.count;
    })
  }

  getLatestEntryDetail(): void{ 
    this.entryService.getLatestEntry().subscribe((res)=>{
      console.log('latest entry',res);
      this.latestEntry = res;
      this.entryService.getEntryImageUrl(res.photopath).subscribe(
        (res)=>{
          console.log('EntryUrl',res)
          this.entryUrl = res.imageurl;
        }
      )
    })
  }
  
  getLatestAlertDetail(): void{ 
    this.alertService.getLatestAlert().subscribe((res)=>{
      console.log('alert',res)
      this.latestAlert = res;
      this.alertService.getAlertImageUrl(res.photoid).subscribe((res)=>{
        console.log('alertUrl',res)
        this.alertUrl = res.imageurl
      })
    })

  }




}
