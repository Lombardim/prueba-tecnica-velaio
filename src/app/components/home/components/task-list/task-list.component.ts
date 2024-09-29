import {Component, OnInit} from '@angular/core';
import {TaskData} from '../../../../shared/interfaces/task.interface';
import {TaskService} from '../../../../shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public selectedFilter: string = 'all';
  tasks: TaskData[] = [];
  filteredTasks: TaskData[] = [];

  constructor(
    private taskService: TaskService,
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
}
