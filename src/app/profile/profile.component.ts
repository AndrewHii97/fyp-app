import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private profileService : ProfileService,
    private _snackBar: MatSnackBar,
    private dialog : MatDialog) { }

  public userId : Number = parseInt(localStorage.getItem('id'))
  
  public userProfile;

  public normalMode: Boolean = true;

  public profileForm : FormGroup = this.fb.group({
    name: [''],
    age: [''],
    gender: [''],
    contact: [''],
    username: ['']
  });
  
  public passwordForm : FormGroup = this.fb.group({ 
    currPswd: [''],
    newPswd: [''],
    rePswd: ['']
  })

  public submitPassword(){ 
    // make sure the new password is reentered correctly 
    if( this. passwordForm.controls.newPswd.value === this.passwordForm.controls.rePswd.value){ 
      this.profileService.updatePassword(this.userId, {
        old: this.passwordForm.controls.currPswd.value ,
        new: this.passwordForm.controls.newPswd.value
      }).subscribe(
        (res) => { 
          this._snackBar.open("password Updated");
        },
        (err) => {
          this._snackBar.open("incorrect current password");
        },
        () =>{ 
           this.passwordForm.reset();
        }
      )
    }else{ 
      this._snackBar.open("new password does not match password reentered","Dismiss");
      this.passwordForm.reset();
    }
  }


  public disableForm(){ 
    this.profileForm.controls.name.disable();
    this.profileForm.controls.age.disable();
    this.profileForm.controls.gender.disable();
    this.profileForm.controls.contact.disable();
    this.profileForm.controls.username.disable();
  }

  public enableForm(){ 
    this.profileForm.controls.name.enable();
    this.profileForm.controls.age.enable();
    this.profileForm.controls.gender.enable();
    this.profileForm.controls.contact.enable();
    this.profileForm.controls.username.enable();
  }

  ngOnInit(): void {
    // disable the form first 
    this.disableForm();
    this.getProfile(this.userId);

  }

  public getProfile(userid: Number) { 
    this.profileService.getProfile(userid).subscribe((profile)=>{
      console.log(profile)
      this.userProfile = { 
        'name': profile.name,
        'age': profile.age,
        'gender': profile.gender,
        'contact': profile.contact,
        'username' : profile.username,
        'photokey': profile.photokey,
        'officertype' : profile.officertype,
      }
      this.profileForm.patchValue({ 
        'name': profile.name,
        'age': profile.age,
        'gender': profile.gender,
        'contact': profile.contact,
        'username': profile.username,
      })
      }
    );
  }
  
  public enableEdit() { 
    this.normalMode = false;
    this.enableForm(); 
  }

  public onSubmit() { 
    this._snackBar.open("Submitted", "Dismiss");
    this.disableForm();
    this.normalMode = true;
    // Update the database value 
    this.profileService.updateProfile(this.userId,{
      'name': this.profileForm.controls.name.value,
      'age': this.profileForm.controls.age.value,
      'gender': this.profileForm.controls.gender.value,
      'contact' : this.profileForm.controls.contact.value,
      'username': this.profileForm.controls.username.value
    }).subscribe(
      res=> {
        this._snackBar.open("Profile Updated","Dismiss")
        this.userProfile = { 
          'name': this.profileForm.controls.name.value,
          'age': this.profileForm.controls.age.value,
          'gender': this.profileForm.controls.gender.value,
          'contact' : this.profileForm.controls.contact.value,
          'username': this.profileForm.controls.usernam.value,
        }
      } ,
      err=> {
        this._snackBar.open("Update fail","Dismiss");
        this.revertForm();
      }
    )
    // Update the userProfile variable 

  }

  public onCancel(){ 
    this.disableForm();
    this.normalMode = true;
    this.revertForm() 
  }

  // revert form to original value despite changes made
  public revertForm(){ 
    this.profileForm.patchValue({
      'name': this.userProfile.name,
      'age': this.userProfile.age,
      'gender': this.userProfile.gender,
      'contact': this.userProfile.contact,
      'username': this.userProfile.username
    })
  }

  public onFileSelected(){ 
    console.log("file is selected");
  }

  private testData: string = 'testdata' ;
  public openDialog(){ 
    const dialogRef = this.dialog.open(UploadFileDialog, { 
      height: '400px',
      width: '400px',
      data : { id: this.userId },
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result =>{ 
      console.log(result);
    })
  }


}

@Component({ 
  selector: 'upload-file-dialog',
  templateUrl : 'upload-file-dialog.html'
})
export class UploadFileDialog{ 

  public selectedFile;
  public imagePath;
  public imageUrl; 
  public message: string;
  
  constructor(
    public dialogRef : MatDialogRef<UploadFileDialog>,
    public profileService : ProfileService,
    @Inject(MAT_DIALOG_DATA) public data : any) { }
  
  preview(files){ 
    if(files.length === 0){
      return;
    }
    
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null){
      this.message = "Only Image are supported.";
      return;
    }


    let reader = new FileReader();
    this.imagePath = files;
    this.selectedFile = files[0];
    console.log(this.imagePath)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event)=> { 
      this.imageUrl = reader.result;
    }

  }


  submitImage(): void { 
    this.profileService.updatePhoto(this.data.id ,this.selectedFile, this.selectedFile.name)
      .subscribe(
        (res)=>{ 
          this.dialogRef.close('success');
        },
        (err)=>{ 
          this.dialogRef.close('fail');
        }
      );
  }

  onNoClick(): void { 
    this.dialogRef.close("some value");
  }
}