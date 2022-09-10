import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
job:any
  constructor(private http:HttpClient,public dialogRef: MatDialogRef<ApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthService,private _snackBar: MatSnackBar) { 
      this.job=data
    }

    apply()
    {
      const header=this.auth.getAuthorizationHeaders()
      this.http.post('/api/jobs/apply/'+this.job._id,{}).subscribe((res:any)=>{
        console.log(res)
        this._snackBar.open(res.message,'ok',{duration:2000})
      },(e)=>{
        console.log(e)
        this._snackBar.open(e.error,'ok',{duration:3000})
      })
    }

  ngOnInit(): void {
  }

}
