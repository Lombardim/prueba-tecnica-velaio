import { Injectable } from '@angular/core';
import {AssociatedPeople, CreateTaskData, TaskData, TodoInterface} from '../interfaces/task.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {lastValueFrom} from 'rxjs';
import {faker} from '@faker-js/faker/locale/en';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskData[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  async getAllTasks(): Promise<TaskData[]> {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    if (this.tasks.length > 0) {
      return this.tasks;
    }
    const tasks: TaskData[] = [];
    const todoList = await lastValueFrom(this.http.get<TodoInterface[]>(`${environment.api}/todos`));
    todoList.forEach((todo) => {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      tasks.push({
        id: todo.id,
        name: todo.title,
        deadline: `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
        status: todo.completed,
        associatedPeople: this.generatePeople(),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks = tasks;
    return this.tasks;
  }
  generatePeople(): Record<string, AssociatedPeople> {
    const people: Record<string, AssociatedPeople> = {};
    const n = faker.number.int({min: 1, max: 5});
    let i = 0;
    while(i < n) {
      const person = this.generateRandomPerson();
      if (!people[person.fullName]) {
        people[person.fullName] = person;
        i++;
      }
    }
    return people;
  }
  generateRandomPerson(): AssociatedPeople {
    return {
      age: faker.number.int({min: 18, max: 100}),
      fullName: faker.person.fullName(),
      skills: this.generateRandomSkills(),
    };
  }
  generateRandomSkills() {
    const skills: string[] = [];
    const n = faker.number.int({min: 1, max: 10});
    for (let i = 0; i < n; i++) {
      skills.push(faker.person.jobArea());
    }
    return skills;
  }
  async createTask(body: CreateTaskData) {
    // TODO ADD ENDPOINT
    // await this.http.post(`${environment.api}/todos`, body);
    const newId = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push({
      id: newId,
      name: body.name,
      deadline: body.deadline,
      status: false,
      associatedPeople: body.associatedPeople,
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  async updateTask(body: CreateTaskData) {
    if (body.id) {
      // TODO ADD ENDPOINT
      // await this.http.patch(`${environment.api}/todos/${body.id}`, body);
      const i = this.tasks.findIndex((task) => task.id === body.id);
      if (i >= 0) {
        this.tasks[i] = {
          id: body.id,
          name: body.name,
          deadline: body.deadline,
          status: false,
          associatedPeople: body.associatedPeople,
        };
      }
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  async deleteTask(id: number) {
    // TODO ADD ENDPOINT
    // await this.http.delete(`${environment.api}/todos/${id}`);
    const i = this.tasks.findIndex((task) => task.id === id);
    if (i >= 0) {
      this.tasks.splice(i, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }
  async markAsCompleted(id: number) {
    // TODO ADD ENDPOINT
    // await this.http.post(`${environment.api}/todos/${id}/markAsRead`);
    const i = this.tasks.findIndex((task) => task.id === id);
    if (i >= 0) {
      this.tasks[i].status = true;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }
}
