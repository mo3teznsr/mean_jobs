import { HttpClient } from '@angular/common/http';
import {  OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/shared/services';
import { UserDailogComponent } from '../user-dailog/user-dailog.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications:any 
  list:any
  displayedColumns: string[] = ['date', 'user','email','mobile','action'];
  dataSource:any;
id=''
@ViewChild(MatPaginator) paginator: any;
@ViewChild(MatSort) sort: any;
  constructor(private http:HttpClient,private auth:AuthService, private route: ActivatedRoute,public dialog: MatDialog ) {
    const headers=this.auth.getAuthorizationHeaders()
   
   }

   getData(){
    this.http.get('/api/jobs/applications/'+this.id).subscribe((res)=>{
      this.applications=res 
      this.list=res
      this.dataSource = new MatTableDataSource(this.applications);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(user?:any){
    const dialogRef = this.dialog.open(UserDailogComponent, {
      width: '80%',
      data: user??'',
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id']
      this.getData()
    })
  }





}
