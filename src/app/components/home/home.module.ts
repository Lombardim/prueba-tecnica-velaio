import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskActionComponent } from './components/task-action/task-action.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskActionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule,
  ]
})
export class HomeModule { }
