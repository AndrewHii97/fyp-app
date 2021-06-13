import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from '../../services/entry.service';


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit, OnChanges {
  @Input() selectedEntry : Entry;
  public recognizedFace
  oriImageUrl : string ;
  loading : boolean = false;
  facesNotFound : boolean = false;

  constructor(private entryService: EntryService ) { }

  ngOnInit(): void {}

  ngOnChanges(){
    if(this.selectedEntry) {
      this.getUrlEntry();
      this.getFaceInEntry();
    }
  }

  getUrlEntry(): void{ 
    this.loading = true;
    this.entryService.getEntryImageUrl(this.selectedEntry.photopath).subscribe(
     (urlJson)=>{
       this.loading = false;
        this.oriImageUrl = urlJson.imageurl 
     }

    )
  }

  getFaceInEntry(): void{ 
    this.recognizedFace = [];
    this.entryService.getEntryFace(this.selectedEntry.id).subscribe(
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
