import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDailogComponent } from './job-dailog/job-dailog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs:any=[]
  list:any=[]
  search=''

  constructor(public dialog: MatDialog,private http:HttpClient) {
    this.getJobs()
   }

  ngOnInit(): void {
  }

  filter(){
    this.list=this.jobs
    this.list=this.list.filter((item:any)=>item.title.toLowerCase().indexOf(this.search.toLowerCase())>-1||
    item.desciption.toLowerCase().indexOf(this.search.toLowerCase())>-1||
    item.industry.toLowerCase().indexOf(this.search.toLowerCase())>-1)
  }


  getJobs(){
    this.http.get('/api/jobs/list').subscribe(res=>{
      this.jobs=res
      this.list=res
    },(e)=>{
      console.log(e)
    })
  }


  manageJob(job?:any){
    const dialogRef = this.dialog.open(JobDailogComponent, {
      width: '450px',
      data: job??'',
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      setTimeout(()=>this.getJobs(),2000)
      
      console.log('closed')
      if(result)
        {
   
    }
   
    });

  }

}
