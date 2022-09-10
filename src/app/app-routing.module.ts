import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './jobs/applications/applications.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },

  {
    path: 'jobs',
   component:JobsComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"jobs/applications/:id",
    component:ApplicationsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
