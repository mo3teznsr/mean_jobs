import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplyComponent } from './apply/apply.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  search:String=''
  jobs:any=[]
  list:any=[]
  constructor(public dialog: MatDialog,private http:HttpClient)
  {
    this.getJobs()
  }

  apply(job:any){
    const dialogRef = this.dialog.open(ApplyComponent, {
      width: '80%',
      data: job,
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  filter(){
 
    this.list=this.jobs
    this.list=this.list.filter((item:any)=>item.title.toLowerCase().indexOf(this.search.toLowerCase())>-1||
    item.desciption.toLowerCase().indexOf(this.search.toLowerCase())>-1||
    item.industry.toLowerCase().indexOf(this.search.toLowerCase())>-1)

   
  }

  getJobs()
  {
    this.http.get('/api/jobs/list').subscribe((res)=>{
      this.jobs=res
      this.list=res
    },(e)=>{
      
    })
  }
}
