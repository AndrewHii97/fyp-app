import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { HousingUnitService } from '../services/housing-unit.service'
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NewHouseComponent } from './new-house/new-house.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateHouseComponent } from './update-house/update-house.component';

@Component({
  selector: 'app-housing-unit',
  templateUrl: './housing-unit.component.html',
  styleUrls: ['./housing-unit.component.css']
})
export class HousingUnitComponent implements OnInit {

  public houses : MatTableDataSource<any>;
  // change this arraw to change order of table 
  public displayedColumn : string[] = ['livingunitid','ownername','unitcode','action'];
  
  public categorySelected : string = "" 
  
  // search for MatSort directive to access the datasource
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey : string;

  constructor(private housingUnitService : HousingUnitService, private createDialog: MatDialog,
    private _snackBar: MatSnackBar ){ }

  ngOnInit(): void {
    this.getHouses();
   
  }

  getHouses() { 
    this.housingUnitService.getHouses().subscribe(
      res=>{ 
        this.houses = new MatTableDataSource(res);
        this.houses.sort = this.sort;
        this.houses.paginator = this.paginator;
        this.houses.filterPredicate = (data, filter)=>{
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
      }, 
      err=>{ 
        console.log(err);
      }
    )
  }

  onSearchClear(){ 
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){ 
    this.houses.filter = this.searchKey.trim().toLowerCase();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.houses.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.createDialog.open(NewHouseComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => { 
        if(res == 'success'){
          this._snackBar.open("Success: New Unit Created","Dismissed");
        }else if (res == 'fail'){ 
          this._snackBar.open("Fail: Duplicate UnitCode","Dismissed");
        }
        this.getHouses();
      }
    )
  }

  editHouse(house) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { ...house };
    let dialogRef =  this.createDialog.open(UpdateHouseComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res) => { 
        this.getHouses();
      }
    )
  }

  deleteHouse(house){ 
    this.housingUnitService.deleteHouse(house.livingunitid)
      .subscribe(
        (res)=>{
          this.getHouses();
        }
      );

  }


}
