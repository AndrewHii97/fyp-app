import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { Key } from '../interfaces/key';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SecurityNewComponent } from './security-new/security-new.component';
import { SecurityUpdateComponent } from './security-update/security-update.component';
import { EditImageComponent } from './edit-image/edit-image.component';
import { Security } from '../interfaces/security'

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  public securitylist : MatTableDataSource<Security>;
  // column displayed in the 
  public displayedColumn : string[] = ['id','securityname','officertype','contact','username','action']

  // for searching according to categories 
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedKey : Key;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private securityService: SecurityService ,
    private createDialog: MatDialog) { }

  ngOnInit(): void {
    this.getSecurity();
  }

  onSelect(security): void { 
    this.selectedKey = security;
  }
  

  getSecurity(): void { 
    this.securityService.getSecurityList().subscribe(
      (securities)=>{
        this.securitylist = new MatTableDataSource(securities);
        this.securitylist.sort = this.sort;
        this.securitylist.paginator = this.paginator;
        this.securitylist.filterPredicate = (data, filter)=>{
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
    let dialogRef : MatDialogRef<SecurityNewComponent> = this.createDialog.open(
      SecurityNewComponent,dialogConfig
    )
    dialogRef.afterClosed().subscribe( 
      (res)=>{
        this.getSecurity();
    })
  }

  editSecurity(security):void { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.data = {...security};
    let dialogRef : MatDialogRef<SecurityUpdateComponent> = 
      this.createDialog.open(SecurityUpdateComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getSecurity();
      }
    )
  }

  updateSecurityImage(security):void{ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    dialogConfig.data = {...security};
    let dialogRef : MatDialogRef<EditImageComponent> = 
      this.createDialog.open(EditImageComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
      (res)=>{
        this.getSecurity();
      }
    )
  }

  deleteSecurity(security: Security):void { 
    this.securityService.deleteSecurity(security.id).subscribe(
      (res)=>{
        if(res.valid){
          this.getSecurity();
        }
      }
    );
  }

  applyFilter():void { 
    this.securitylist.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() : void { 
    this.searchKey = "";
    this.applyFilter();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.securitylist.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }
}
