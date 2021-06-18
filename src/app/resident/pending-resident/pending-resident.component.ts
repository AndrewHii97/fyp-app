import { Component, OnInit, ViewChild } from '@angular/core';
import { ResidentService } from '../../services/resident.service';
import { Resident } from '../../interfaces/resident';
import { MatTableDataSource  } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-pending-resident',
  templateUrl: './pending-resident.component.html',
  styleUrls: ['./pending-resident.component.css']
})
export class PendingResidentComponent implements OnInit {

  public residentlist : MatTableDataSource<Resident>;
  public displayedColumn : string[] = 
    ['residentid', 'name', 'gender','icno' , 'address', 'contact','unitcode', 'username','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedResident : Resident;
  public imageUrl : string
  constructor(private residentService: ResidentService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  ngOnInit(): void {
    this.getResident();

  }

  onSelect(resident): void { 
    this.selectedResident = resident;
  }
  
  approveResident(resident: Resident): void{ 
    let id = resident.id;
    this.residentService.approveResident(id).subscribe((res)=>{
      this.getResident();
    })
  }

  getResident(): void { 
    this.residentService.getResident('false').subscribe(
      (resident)=>{
        this.residentlist = new MatTableDataSource(resident);
        this.residentlist.sort = this.sort;
        this.residentlist.paginator = this.paginator;
        this.residentlist.filterPredicate = (data, filter)=>{
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

  deleteResident(key):void { 
    this.residentService.deleteResident(key.id).subscribe((res)=>{
      if( res.valid ) { 
        this.getResident();
      }
    })
    this.getResident();
  }

  applyFilter():void { 
    this.residentlist.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() : void { 
    this.searchKey = "";
    this.applyFilter();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.residentlist.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }
}
