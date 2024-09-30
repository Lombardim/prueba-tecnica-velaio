import {Component, OnInit} from '@angular/core';
import {TaskData} from '../../../../shared/interfaces/task.interface';
import {TaskService} from '../../../../shared/services/task.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public selectedFilter = 'all';
  tasks: TaskData[] = [];
  filteredTasks: TaskData[] = [];

  constructor(
    private router: Router,
    private taskService: TaskService,
    private translate: TranslateService,
    private toast: ToastrService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getTasks();
  }

  async getTasks() {
    try {
      this.tasks = await this.taskService.getAllTasks();
      this.filteredTasks = [...this.tasks];
    } catch (e: unknown) {
      console.error(e);
    }
  }

  changeFilterType(type: string): void {
    this.selectedFilter = type;
    this.filteredTasks = [];
    switch (type) {
      case 'pending': {
        this.filteredTasks = this.tasks.filter((task) => !task.status);
        break;
      }
      case 'completed': {
        this.filteredTasks = this.tasks.filter((task) => task.status);
        break;
      }
      default: {
        this.filteredTasks = [...this.tasks];
      }
    }
  }

  async addNewTask() {
    await this.router.navigate(['home/action'], {
      queryParams: {type: 'create'},
    });
  }

  async taskAction(action: string, i: number) {
    switch (action) {
      case 'edit': {
        await this.router.navigate(['home/action'], {
          queryParams: {type: 'edit', taskId: this.filteredTasks[i].id}
        });
        break;
      }
      case 'updateStatus': {
        this.tasks = await this.taskService.markAsCompleted(this.filteredTasks[i].id);
        this.filteredTasks = [];
        setTimeout(async () => {
            this.changeFilterType(this.selectedFilter);
            this.toast.success(this.translate.instant('HOME.LIST.MARKED-AS-COMPLETED'));
          }
        );
        break;
      }
      case 'delete': {
        this.tasks = await this.taskService.deleteTask(this.filteredTasks[i].id);
        this.changeFilterType(this.selectedFilter);
        this.toast.success(this.translate.instant('HOME.LIST.DELETED-TASK'));
        break;
      }
    }
  }
}
