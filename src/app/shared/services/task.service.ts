import { Injectable } from '@angular/core';
import {AssociatedPeople, TaskData, TodoInterface} from '../interfaces/task.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
  ) { }

  async getAllTasks(): Promise<TaskData[]> {
    const tasks: TaskData[] = [];
    const todoList = await lastValueFrom(this.http.get<TodoInterface[]>(`${environment.api}/todos`))
    todoList.forEach((todo) => {
      const date = new Date();
      tasks.push({
        name: todo.title,
        deadline: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        status: todo.completed,
        associatedPeople: {
          'John Doe': this.generateRandomPerson(),
          'Jane Doe': this.generateRandomPerson('Jane Doe'),
        },
      })
    })
    return tasks;
  }

  generateRandomPerson(name: string = 'John Doe'): AssociatedPeople {
    return {
      age: Math.floor(Math.random() * 100),
      fullName: name,
      skills: ['Angular', 'TypeScript', 'CSS'],
    };
  }
}
