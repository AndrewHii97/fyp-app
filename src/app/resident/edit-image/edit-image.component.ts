import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ResidentService } from '../../services/resident.service';
import { FormControl, Validators} from '@angular/forms'

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

  constructor(@Inject(MAT_DIALOG_DATA) private resident,
    private residentService: ResidentService,
    private dialogRef: MatDialogRef<EditImageComponent>) { }

  ngOnInit(): void {
    this.imageControl = new FormControl('', Validators.required)
    this.getInitialUrl();

  }

  public getInitialUrl(){
    console.log("Get Initila File Url")
    this.residentService.getResidentImage(this.resident.id).subscribe(
      (res)=>{
        console.log(res);
        if(res?.imageUrl) {
          this.originalImageUrl = res.imageUrl;
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
      const reader = new FileReader();
      reader.onload= ()=>{
        this.newImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file)
    }
    console.log(this.imageControl.value);
    this.residentService.checkImageUpload(this.imageControl.value).subscribe(
      (res)=>{
        this.loading = false;
        this.validPhoto = res.valid;
        this.message = res.message;
      }
    )

  }

  public uploadNewImage(){
    this.residentService.updateResidentImage(this.oriImage.faceid,this.oriImage.photopath,this.oriImage.photoid, this.imageControl.value).subscribe(
      (res)=>{
        this.closeDialog();
      }
    )

  }

  public closeDialog(){
    this.dialogRef.close();

  }

}
