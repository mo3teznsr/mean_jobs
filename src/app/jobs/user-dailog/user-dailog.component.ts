import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dailog',
  templateUrl: './user-dailog.component.html',
  styleUrls: ['./user-dailog.component.scss']
})
export class UserDailogComponent implements OnInit {

  user:any
  constructor(public dialogRef: MatDialogRef<UserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user=data
     }

  ngOnInit(): void {
  }

}
