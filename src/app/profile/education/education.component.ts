
import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@app/shared/services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'education-dialog',
    templateUrl: 'education.html',
    styleUrls: ['./education.scss']
  })
  export class EducationDailog {
  history={school:'',heightLevel:false,ended:''}
    constructor(
      public dialogRef: MatDialogRef<EducationDailog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      if(data)
      {
        this.history.school=data.school
        this.history.heightLevel=data.heightLevel
        this.history.ended=data.ended
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }