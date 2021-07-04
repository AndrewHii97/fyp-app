import { SecurityService } from '../../services/security.service';
import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { Security } from '../../interfaces/security';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-security-update',
  templateUrl: './security-update.component.html',
  styleUrls: ['./security-update.component.css']
})
export class SecurityUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SecurityUpdateComponent>,
    private securityService : SecurityService,
    @Inject(MAT_DIALOG_DATA) private security
    ) {} 

  public securityForm : FormGroup  = this.fb.group({
    securityname : [''],
    gender : [''],
    contact : [''],
    officertype : ['']
  });

  ngOnInit(): void {
    this.securityForm.patchValue({
     securityname :  this.security.securityname,
     gender : this.security.gender,
     contact : this.security.contact,
     officertype: this.security.officertype
    })
  }

  editSecurity(){
    this.securityService.updateSecurity({
      id: this.security.id,
      securityname: this.securityForm.controls.securityname.value,
      gender: this.securityForm.controls.gender.value,
      contact: this.securityForm.controls.contact.value,
      officertype: this.securityForm.controls.officertype.value
    }).subscribe(
      (res)=>{
        this.dialogRef.close();
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }



}
