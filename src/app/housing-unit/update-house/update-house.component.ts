import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HousingUnitService } from '../../services/housing-unit.service';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.css']
})
export class UpdateHouseComponent implements OnInit {

  public updateForm : FormGroup = this.fb.group({
    ownername: [''],
    unitcode : ['']
  })

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)private data,
    private dialogRef: MatDialogRef<UpdateHouseComponent>,
    private houseService: HousingUnitService ) { }

  ngOnInit(): void {
    this.updateForm.patchValue({
      ownername : this.data.ownername,
      unitcode : this.data.unitcode
    })
  }

  public updateHouse() { 
    console.log('updateHouse in updatehouse ts ')
    this.houseService.updateHouse({
      livingunitid: this.data.livingunitid,
      ownername: this.updateForm.controls.ownername.value,
      unitcode: this.updateForm.controls.unitcode.value
    }).subscribe(
      (res)=>{
        console.log(res);
        this.dialogRef.close();
      }

    )
  }

  public closeDialog(){ 
    this.dialogRef.close();
  }


}
