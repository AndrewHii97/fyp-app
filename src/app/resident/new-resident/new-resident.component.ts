import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { ResidentService } from '../../services/resident.service';
import { HousingUnitService } from '../../services/housing-unit.service'
import { Resident } from '../../interfaces/resident';
import { House } from '../../interfaces/house';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-new-resident',
  templateUrl: './new-resident.component.html',
  styleUrls: ['./new-resident.component.css']
})
export class NewResidentComponent implements OnInit {
  
  public loadingStatus : boolean = false;
  public houses : House[];
  public imageUrl;
  public imagePath;
  public selectedFile;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewResidentComponent>,
    private houseService: HousingUnitService,
    private residentService: ResidentService) { }

  public residentForm : FormGroup  = this.fb.group({
    name : [''],
    gender : [''],
    icno : [''],
    address : [''],
    contact : [''],
    username : [''],
    password: [''],
    unitcode : ['']
  });

  public imageForm : FormGroup = this.fb.group({
    image : ['']
  })


  ngOnInit(): void {
    this.houseService.getHouses().subscribe(
      (houses)=>{
        this.houses = houses;
      }
    ) 
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
      livingunitid: this.residentForm.controls.unitcode.value.livingunitid
    }).subscribe((res)=>{
      this.dialogRef.close();
    })
  }


  preview(files){ 
    if(files.length === 0){
      return;
    }
    
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null){
      return;
    }

    let reader = new FileReader();
    this.selectedFile = files[0]; // submit together on creation
    reader.readAsDataURL(files[0]);
    reader.onload = (_event)=> { 
      this.imageUrl = reader.result;
    }
  }
  
  closeDialog(): void{ 
    this.dialogRef.close();
  }

}
