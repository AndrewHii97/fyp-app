import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SecurityService } from '../../services/security.service';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {


  public validPhoto : Boolean = false;
  public loading : Boolean = false;
  public message : string; 
  public originalImageUrl;
  public oriImage;
  public newImageUrl;
  public imageControl: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) private security,
    private securityService : SecurityService,
    private dialogRef: MatDialogRef<EditImageComponent>) { }

  ngOnInit(): void {
    this.imageControl = new FormControl('', Validators.required)
    this.getInitialUrl();

  }

  public getInitialUrl(){
    console.log("Get Initila File Url")
    this.securityService.getSecurityImage(this.security.id).subscribe(
      (res)=>{
        console.log(res);
        if(res?.url) {
          this.originalImageUrl = res.url;
          this.oriImage = res;
        }
      }
    )

  }

  public onFileSelected(event){
    this.loading = true
    let file = (event.target as HTMLInputElement).files[0];
    this.imageControl.patchValue(file);
    if(file){
      this.validPhoto = true;
      const reader = new FileReader();
      reader.onload= ()=>{
        this.newImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file)
    }
  }

  public uploadNewImage(){
    this.securityService.updateProfilePhoto(this.security.id,this.imageControl.value, 'file.jpg').subscribe(
      (res)=>{
        this.closeDialog();
      }
    )

  }

  public closeDialog(){
    this.dialogRef.close();

  }
}
