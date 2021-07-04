import { Component, OnInit, ViewChild } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { Entry } from '../interfaces/entry';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  public entrylist : MatTableDataSource<Entry>;
  public displayedColumn : string[] = ['entryid','entrydate','entrytime','name','action'];
  public searchKey : string; 
  public categorySelected : string = "";
  public selectedEntry : Entry;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(): void { 
    this.entryService.getEntryList().subscribe(
      (entries)=>{
        console.log(entries);
        this.entrylist = new MatTableDataSource(entries);
        this.entrylist.sort = this.sort;
        this.entrylist.paginator = this.paginator;
        this.entrylist.filterPredicate = (data, filter)=>{
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
  
  onSelect(entry): void {
    this.selectedEntry = entry;
  }

  deleteEntry(entry): void{ 
    this.entryService.deleteEntry(entry.entryid, entry.photopath, entry.photoid)
      .subscribe( 
        (res)=>{
          this.getEntries();
        }
      )
  }


  applyFilter():void { 
    this.entrylist.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() : void { 
    this.searchKey = "";
    this.applyFilter();
  }

  changeCategory(){ 
    if(this.searchKey){
      this.entrylist.filter = this.searchKey.trim().toLowerCase();
    }else{ 
      this.searchKey = "" 
    }
    this.applyFilter();
  }
  
}
