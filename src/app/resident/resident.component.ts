import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Resident } from '../interfaces/resident';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ResidentService } from '../services/resident.service';
import { NewResidentComponent } from './new-resident/new-resident.component';
import { EditResidentComponent } from './edit-resident/edit-resident.component';
import { EditImageComponent } from './edit-image/edit-image.component';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {
  public residentlist : MatTableDataSource<Resident>;
  public displayedColumn : string[] = 
    ['residentid', 'name', 'gender','icno' , 'address', 'contact','unitcode', 'username','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedResident : Resident;
  public imageUrl : string;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private residentService: ResidentService,
    private createDialog: MatDialog) { }

  ngOnInit(): void {
    this.getResident();

  }

  onSelect(resident): void { 
    this.selectedResident = resident;
  }
  

  getResident(): void { 
    this.residentService.getResident('true').subscribe(
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


  onCreate() :void{ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    let dialogRef : MatDialogRef<NewResidentComponent> = this.createDialog.open(
      NewResidentComponent ,dialogConfig
    )
    dialogRef.afterClosed().subscribe( 
      (res)=>{
        this.getResident();
    })
  }

  editResident(key):void { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.data = {...key};
    let dialogRef : MatDialogRef<EditResidentComponent> = 
      this.createDialog.open(EditResidentComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getResident();
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

  updateResidentImage(resident){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.data = {...resident};
    let dialogRef : MatDialogRef<EditImageComponent> = 
      this.createDialog.open(EditImageComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getResident();
      }
    )
  }


}
