import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.scss']
})
export class ExperianceComponent implements OnInit {
history={title:"",company:"",ended:"",started:"",industry:""}
industries:any
  constructor(  public dialogRef: MatDialogRef<ExperianceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient) {
      this.http.get('/assets/industries.json').subscribe(res=>this.industries=res)
      if(data)
      {
        this.history.title=data.title
        this.history.company=data.company
        this.history.ended=data.ended
        this.history.started=data.started
        this.history.industry=data.industry
      }
     }

  ngOnInit(): void {
  }

}
