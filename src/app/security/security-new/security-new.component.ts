import { SecurityService } from '../../services/security.service';
import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-security-new',
  templateUrl: './security-new.component.html',
  styleUrls: ['./security-new.component.css']
})
export class SecurityNewComponent implements OnInit {
  
  public loadingStatus : boolean = false;
  public disableKeySelection: boolean = true;
  public imageUrl;
  public validPhoto = false;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SecurityNewComponent>,
    private securityService : SecurityService
    ) { }

  public securityForm : FormGroup  = this.fb.group({
    securityname : [''],
    gender : [''],
    contact : [''],
    username : [''],
    password: [''],
    officertype: ['']
  });

  public imageForm : FormGroup = this.fb.group({
    image : [null, Validators.required]
  })


  ngOnInit(): void {
  }


  submitNewSecurity(){ 
    this.loadingStatus = true;
    this.securityService.createNewSecurity({
      securityname : this.securityForm.controls.securityname.value,
      gender: this.securityForm.controls.gender.value,
      contact: this.securityForm.controls.contact.value,
      username: this.securityForm.controls.username.value,
      password: this.securityForm.controls.password.value,
      officertype:  this.securityForm.controls.officertype.value
    }).subscribe((res)=>{
      let id = res.id.id
      this.securityService.updateProfilePhoto(id,this.imageForm.controls.image.value, 'image.jpg').subscribe(
        (resp)=>{ 
          this.dialogRef.close();
        }
      );
    })

  }

   
  onFileSelected(event){ 
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
    this.validPhoto = true;
  }

  
  closeDialog(): void{ 
    this.dialogRef.close();
  }

  
  
}
