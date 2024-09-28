import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: TaskListComponent,
      },
      {
        path: 'action',
        loadComponent: () => import('./components/task-action/task-action.component').then((c) => c.TaskActionComponent),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
