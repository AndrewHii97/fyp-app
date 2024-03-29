import { Component, OnInit, ViewChild } from '@angular/core';
import { KeyService } from '../services/key.service';
import { Key } from '../interfaces/key';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NewKeyComponent } from './new-key/new-key.component';
import { EditKeyComponent } from './edit-key/edit-key.component';
import { DeleteKeyAlertComponent } from './delete-key-alert/delete-key-alert.component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  
  public officerType = localStorage.getItem('officertype');
  public keylist : MatTableDataSource<Key>;
  public displayedColumn : string[] = ['keyid','keyvalue','unitcode','action']
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedKey : Key;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private keyService: KeyService,
    private createDialog: MatDialog) { }

  ngOnInit(): void {
    this.getKeys();
    if (this.officerType == 'admin') {
     this.displayedColumn = ['keyid','keyvalue','unitcode','action']
    }else{
     this.displayedColumn = ['keyid','keyvalue','unitcode']
    }
  }

  onSelect(key): void { 
    this.selectedKey = key;
  }
  

  getKeys(): void { 
    this.keyService.getKeyList().subscribe(
      (keys)=>{
        this.keylist = new MatTableDataSource(keys);
        this.keylist.sort = this.sort;
        this.keylist.paginator = this.paginator;
        this.keylist.filterPredicate = (data, filter)=>{
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
    let dialogRef : MatDialogRef<NewKeyComponent> = this.createDialog.open(
      NewKeyComponent,dialogConfig
    )
    dialogRef.afterClosed().subscribe( 
      (res)=>{
        this.getKeys();
    })
  }

  editKey(key):void { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.data = {...key};
    let dialogRef : MatDialogRef<EditKeyComponent> = 
      this.createDialog.open(EditKeyComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getKeys();
      }
    )
  }

  deleteKey(key):void { 
    this.keyService.deleteKey(key.keyid).subscribe(
      (res)=>{
        console.log(res)
        // some body own the key 
        if (res.valid == false && res.message == 'keyowned'){
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = false;
          dialogConfig.width = '60%';
          let dialogRef : MatDialogRef<DeleteKeyAlertComponent> = 
            this.createDialog.open(DeleteKeyAlertComponent,dialogConfig);
        }else{
          this.getKeys();
        }
      }
    );
  }

  applyFilter():void { 
    this.keylist.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() : void { 
    this.searchKey = "";
    this.applyFilter();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.keylist.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }
}
