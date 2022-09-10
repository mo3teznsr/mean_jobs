import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-job-dailog',
  templateUrl: './job-dailog.component.html',
  styleUrls: ['./job-dailog.component.scss']
})
export class JobDailogComponent implements OnInit {
  job:any={title:"",company:"",details:"",industry:"",isActive:true,desciption:""}
  industries:any=[]
  constructor(private http:HttpClient,public dialogRef: MatDialogRef<JobDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private auth:AuthService,private _snackBar: MatSnackBar) { 
    this.http.get('/assets/industries.json').subscribe((res:any)=>this.industries=res)
    if(data)
    {
      this.job=data
    }
  }

  ngOnInit(): void {
  }

  save()
  {
    const headers=this.auth.getAuthorizationHeaders()
    if(!this.data)
    {
      this.http.post('/api/jobs',this.job,{headers:headers}).subscribe(res=>{
        this._snackBar.open('succefully created','ok',{duration:3000})

      },(e)=>{
        console.log(e)
        this._snackBar.open('something went wrong','ok',{duration:3000})
      })

      this.dialogRef.close()
    }
    else 
    {
      this.http.put('/api/jobs/'+this.data._id,this.job,{headers:headers})
      .subscribe(res=>{
        this._snackBar.open('succefully updated ','ok',{duration:3000})

      },(e)=>{
        this._snackBar.open('something went wrong','ok',{duration:3000})
      })

      this.dialogRef.close(true)
    }
  }

}
