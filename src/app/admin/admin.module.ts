import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { ListComponent } from './jobs/list/list.component';
import { CreateComponent } from './jobs/create/create.component';
import { UpdateComponent } from './jobs/update/update.component';

@NgModule({
  declarations: [AdminComponent, ListComponent, CreateComponent, UpdateComponent],
  imports: [CommonModule, AdminRoutingModule],
  providers: [OnlyAdminUsersGuard],
})
export class AdminModule {}
