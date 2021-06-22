import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ResidentService } from '../../services/resident.service';
import { HousingUnitService } from '../../services/housing-unit.service';
import { KeyService } from '../../services/key.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { House } from '../../interfaces/house';
import { Key } from '../../interfaces/key';
import { TestService } from 'src/app/shared/test.service';

@Component({
  selector: 'app-edit-resident',
  templateUrl: './edit-resident.component.html',
  styleUrls: ['./edit-resident.component.css']
})
export class EditResidentComponent implements OnInit {
  public loadingStatus : boolean = false;
  public houses : House[];
  public keys: Key[];
  public disableKeySelection: boolean = true;

  constructor(
    private dialogRef : MatDialogRef<EditResidentComponent>,
    private residentService : ResidentService,
    private houseService : HousingUnitService,
    private keyService : KeyService,
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) private resident,
    private testService: TestService

  ) { }

  public residentForm : FormGroup  = this.fb.group({
    name : [''],
    gender : [''],
    icno : [{value: '', disabled: true}],
    address : [''],
    contact : [''],
    unitcode : [''],
    key: ['']
  });

  ngOnInit(): void {    
    let house
    let key

    console.log(this.resident);

    this.houseService.getHouses().subscribe(
      (houses)=>{
        this.houses = houses;
        house = this.houses.find( ele => ele.livingunitid == this.resident.livingunitid );
        this.residentService.findKeyOwned(this.resident.id).subscribe((keyReturned)=>{ 
          key = keyReturned;
          console.log('keyOwner',key, typeof key);
          this.residentForm.patchValue({
            name : this.resident.name,
            address : this.resident.address,
            icno: this.resident.icno,
            contact: this.resident.contact,
            gender: this.resident.gender,
            unitcode: house,
          })
          if(key){
            this.getHouseKey();
            this.residentForm.patchValue({
              key: key
            })
          }
        })
      }) 
    }

  getHouseKey(): void  {
    let livingunitid = this.residentForm.controls.unitcode.value.livingunitid;
    if (livingunitid == null) { 
      this.keys = [];
      this.residentForm.patchValue({
        key: '' 
      })
      this.residentForm.controls['keys'].disable();
      return;

    }

    this.keyService.getKeyQuery(livingunitid).subscribe(
      (keys)=>{
        if(keys != null){
          this.keys = keys;
          this.residentForm.controls['key'].enable();
        }else{ 
          this.residentForm.controls['key'].disable();
        }
      }
    );

    
  }

  submitEditResident(){ 
    this.loadingStatus = true;
    this.residentService.updateResident({
      id :this.resident.id,
      name: this.residentForm.controls.name.value,
      gender: this.residentForm.controls.gender.value,
      icno: this.residentForm.controls.icno.value,
      address: this.residentForm.controls.address.value,
      contact: this.residentForm.controls.contact.value,
      livingunitid: this.residentForm.controls.unitcode.value.livingunitid,
      keyid: this.residentForm.controls.key?.value.keyid 
    }).subscribe((result)=>{
      console.log(result);
      this.closeDialog();
    })

  }

  closeDialog(): void{ 
    this.dialogRef.close();
  }

  CompareFn: ((f1: any, f2: any) => boolean ) | null = this.compareKey;

  compareKey(f1:any, f2:any){
    return f1.keyvalue === f2.keyvalue
  }

}


  
