import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms'
import { HousingUnitService } from '../../services/housing-unit.service'

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css']
})
export class NewHouseComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<NewHouseComponent>,
    private fb: FormBuilder,
    private houseService : HousingUnitService) {}
  
  public houseForm: FormGroup = this.fb.group({
    ownername : [''],
    unitcode: ['']
  });

  ngOnInit(): void {
  }

  submitNewHouse(){ 
    let ownername = this.houseForm.controls.ownername.value;
    let unitcode = this.houseForm.controls.unitcode.value;
    this.houseService.createNewHouse(ownername,unitcode).subscribe(
      (res)=>{
        console.log("result:" + res.valid)
        if (res.valid == true){
          console.log("result in success message")
          this.dialogRef.close('success');
        }else{ 
          console.log("result in fail message")
          this.dialogRef.close('fail');
        }
      }
      );
  }

  closeDialog(): void{ 
    this.dialogRef.close();
  }




}
