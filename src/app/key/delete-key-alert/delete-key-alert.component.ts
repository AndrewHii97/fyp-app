import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-key-alert',
  templateUrl: './delete-key-alert.component.html',
  styleUrls: ['./delete-key-alert.component.css']
})
export class DeleteKeyAlertComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<DeleteKeyAlertComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
