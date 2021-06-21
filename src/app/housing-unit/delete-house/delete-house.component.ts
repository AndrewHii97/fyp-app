import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-house',
  templateUrl: './delete-house.component.html',
  styleUrls: ['./delete-house.component.css']
})
export class DeleteHouseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteHouseComponent>
    ) { }

  ngOnInit(): void {
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

}
