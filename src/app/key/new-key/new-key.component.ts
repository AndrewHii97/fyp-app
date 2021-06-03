import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KeyService } from '../../services/key.service';
import { HousingUnitService } from '../../services/housing-unit.service';
import { House } from '../../interfaces/house';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {
  public houses : House[] = [];
  public loadingStatus : boolean = false;

  constructor(private dialogRef: MatDialogRef<NewKeyComponent>,
    private fb: FormBuilder,
    private keyService : KeyService,
    private houseService : HousingUnitService,
    @Inject(MAT_DIALOG_DATA) private data ) {}
  
  public keyForm: FormGroup = this.fb.group({
    keyvalue : [''],
    livingunit : ['']
  });

  ngOnInit(): void {
    this.houseService.getHouses().subscribe(
      (houses)=>{
        this.houses = houses 
      }
    )
  }

  submitNewKey(){ 
    let keyvalue = this.keyForm.controls.keyvalue.value;
    let livingunitid = this.keyForm.controls.livingunit.value.livingunitid; 
    this.loadingStatus = true;
    this.keyService.newKey(keyvalue, livingunitid).subscribe(
      (res)=>{ 
        this.dialogRef.close();
      }
    )
  }

  closeDialog(): void{ 
    this.dialogRef.close();
  }

}
