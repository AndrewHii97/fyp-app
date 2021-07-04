import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { ResidentService } from '../../services/resident.service';
import { HousingUnitService } from '../../services/housing-unit.service'
import { Resident } from '../../interfaces/resident';
import { KeyService } from '../../services/key.service' 
import { House } from '../../interfaces/house';
import { Key } from '../../interfaces/key';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TestService } from '../../shared/test.service';
import { CustomValidatorService } from 'src/app/shared/custom-validator.service';

@Component({
  selector: 'app-new-resident',
  templateUrl: './new-resident.component.html',
  styleUrls: ['./new-resident.component.css'],
  providers: [{ 
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true}
  }]
})
export class NewResidentComponent implements OnInit {
  
  public loadingStatus : boolean = false;
  public houses : House[];
  public keys;
  public disableKeySelection: boolean = true;
  public imageUrl;
  public validPhoto = false;
  public message;
  public loading = false;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewResidentComponent>,
    private houseService: HousingUnitService,
    private residentService: ResidentService,
    private keyService: KeyService ,
    private testService: TestService,
    private customService : CustomValidatorService
    ) { }

  public residentForm : FormGroup  = this.fb.group({
    name : [''],
    gender : [''],
    icno : [null ,{ asyncValidators: [this.testService.icNoValidation()], updateOn: 'blur'}],
    address : [''],
    contact : [''],
    username : ['' ,{ asyncValidators: [this.testService.userNameValidation()], updateOn: 'blur'}],
    password: [''],
    unitcode : [''],
    key: [{value: '', disabled: this.disableKeySelection}]
  });

  public imageForm : FormGroup = this.fb.group({
    image : [null, Validators.required]
  })


  ngOnInit(): void {
    this.houseService.getHouses().subscribe(
      (houses)=>{
        this.houses = houses;
      }
    ) 
  }

  getHouseKey(): void { 
    let livingunitid = this.residentForm.controls.unitcode.value.livingunitid;
    if (livingunitid == null) { 
      this.keys = [];
      this.residentForm.patchValue({
        key: '' 
      })
      this.disableKeySelection = true;
      return;

    }
    this.keyService.getKeyQuery(livingunitid).subscribe(
      (keys)=>{
        if(keys != null){
          this.keys = keys;
          this.residentForm.controls['key'].enable();
        }else{ 
          this.disableKeySelection = true;
          this.residentForm.controls['key'].disable();
        }
        
      }
    );
  }

  submitNewResident(){ 
    this.loadingStatus = true;
    this.residentService.createResident({
      name: this.residentForm.controls.name.value,
      gender: this.residentForm.controls.gender.value,
      icno: this.residentForm.controls.icno.value,
      address: this.residentForm.controls.address.value,
      contact: this.residentForm.controls.contact.value,
      username: this.residentForm.controls.username.value,
      password: this.residentForm.controls.password.value,
      livingunitid: this.residentForm.controls.unitcode.value.livingunitid,
      keyid: this.residentForm.controls.key.value.keyid
    }).subscribe((res)=>{
      let id = res.id
      this.residentService.uploadImage(id,this.imageForm.controls.image.value).subscribe(
        (resp)=>{ 
          this.dialogRef.close();
        }
      );
    })

  }

   
  onFileSelected(event){ 
    this.loading = true;
    // complete setting file value
    let file = (event.target as HTMLInputElement).files[0];
    // let file = event.target.files[0];
    this.imageForm.patchValue({image: file});

    if (file) { 
      const reader = new FileReader();
      reader.onload = () =>{ 
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.residentService.checkImageUpload( this.imageForm.controls.image.value )
      .subscribe((res)=>{ 
        this.loading = false;
        this.validPhoto = res.valid;
        this.message = res.message;
      });

  }

  
  closeDialog(): void{ 
    this.dialogRef.close();
  }

  


}
