import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './shared/services';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent, SkillDialog } from './profile/profile.component';
import { EducationDailog } from './profile/education/education.component';
import { ExperianceComponent } from './profile/experiance/experiance.component';
import { JobDailogComponent } from './jobs/job-dailog/job-dailog.component';
import { ApplyComponent } from './home/apply/apply.component';
import { ApplicationsComponent } from './jobs/applications/applications.component';
import { ApplicationDailogComponent } from './jobs/application-dailog/application-dailog.component';
import { UserDailogComponent } from './jobs/user-dailog/user-dailog.component';
export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnTheFirstLoad();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
                AppComponent,
                HeaderComponent,
                HomeComponent,
                JobsComponent,
                ProfileComponent,
                SkillDialog,
                EducationDailog,
                ExperianceComponent,
                JobDailogComponent,
                ApplyComponent,
                ApplicationsComponent,
                ApplicationDailogComponent,
                UserDailogComponent
                  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
