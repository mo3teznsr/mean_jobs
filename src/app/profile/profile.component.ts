import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@app/shared/services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EducationDailog } from './education/education.component';
import { ExperianceComponent } from './experiance/experiance.component';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any
  addOnBlur = true;
  skills:any=[]
  input=''
  constructor(private auth:AuthService,public dialog: MatDialog,private http:HttpClient,private _snackBar: MatSnackBar) { 
   this.getData()

  }

  getData()
  {
    this.auth.getUser().subscribe(user=>{
      this.user=user
      this.skills=user?.skills
      
    })
  }

  upload(e:any)
  {
    if(e.target.files[0])
    {
      var headers=this.auth.getAuthorizationHeaders()

      var data=new FormData()
      data.append('cv',e.target.files[0])
      this.http.post('/api/auth/cv',data,{headers:headers}).subscribe((res)=>{
        this.getData()
      },(e)=>{
        console.log(e)
      })
    }
  }

  addSkill(skill?:String): void {
    const dialogRef = this.dialog.open(SkillDialog, {
      width: '350px',
      data: skill??'',
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result)
        {
      if(skill)
      {
        
        this.user.skills[this.user.skills.indexOf(skill)]=result
        
      }
      else 
      {
        this.user.skills.push(result);
      }

      this.auth.setUser(this.user)
      
    }
    });
  }

  update(){
    const headers=this.auth.getAuthorizationHeaders()
    this.http.post('/api/auth/profile',this.user,{headers:headers}).subscribe(res=>{
      this._snackBar.open('Succefully updated', 'ok', {
        duration: 3000
      })
    },(e:any)=>{
      console.log(e)
    })

    
  }

  manageEducation(history?:any): void {
    const dialogRef = this.dialog.open(EducationDailog, {
      width: '350px',
      data: history??null,
    });

    dialogRef.afterClosed().subscribe(result => {
     
     
      if(result&&(result.school&&result.ended))
        {
      if((history))
      {
        
        this.user.education[this.user.education.indexOf(history)]=result
        
      }
      else 
      {
     
        this.user.education.push(result);
        
      
      }

      this.auth.setUser(this.user)
      
    }
    });
  }




  
  manageExperaince(history?:any): void {
    const dialogRef = this.dialog.open(ExperianceComponent, {
      width: '350px',
      data: history??null,
    });

    dialogRef.afterClosed().subscribe(result => {
     
     
      if(result&&(result.title&&result.company&&result.started&&result.ended))
        {
      if((history))
      {
        
        this.user.experiance[this.user.experiance.indexOf(history)]=result
        
      }
      else 
      {
        this.user.experiance.push(result);  
      
      }
      this.auth.setUser(this.user)
      
    }
    });
  }


  deleteEducation(edu:any)
  {
    this.user.education.splice(this.user.education.indexOf(edu),1)
  }

  deleteExperiance(experiance:any)
  {
    this.user.experiance.splice(this.user.experiance.indexOf(experiance),1)
  }

removeSkill(skill:String)
{
  if(!this.user.skills)
  {
    this.user.skills=[]
  }
this.user.skills.splice(this.user.skills.indexOf(skill),1)
this.auth.setUser(this.user)
}



  ngOnInit(): void {
  }

}

@Component({
  selector: 'skill-dialog',
  templateUrl: 'skill.html',
})
export class SkillDialog {
skill:String=''
  constructor(
    public dialogRef: MatDialogRef<SkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.skill=data??''
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
