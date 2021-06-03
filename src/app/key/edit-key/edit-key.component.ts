import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { KeyService } from '../../services/key.service';
import { HousingUnitService } from '../../services/housing-unit.service';
import { House } from '../../interfaces/house';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-edit-key',
  templateUrl: './edit-key.component.html',
  styleUrls: ['./edit-key.component.css']
})
export class EditKeyComponent implements OnInit {
  public houses : House[] = [];
  public loadingStatus : boolean = false;

  constructor(private dialogRef: MatDialogRef<EditKeyComponent>,
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
        let house = houses.find(ele => 
          ele.livingunitid == this.data.livingunitid );
        this.keyForm.patchValue({
          keyvalue: this.data.keyvalue,
          livingunit: house? house: ''
        })
      }
    )
  }

  updateKey(){ 
    let keyvalue = this.keyForm.controls.keyvalue.value;
    let livingunitid = this.keyForm.controls.livingunit.value.livingunitid; 
    this.loadingStatus = true;
    this.keyService.updateKey(this.data.keyid, keyvalue, livingunitid).subscribe(
      (res)=>{ 
        this.dialogRef.close();
      }
    )
  }

  closeDialog(): void{ 
    this.dialogRef.close();
  }

}


