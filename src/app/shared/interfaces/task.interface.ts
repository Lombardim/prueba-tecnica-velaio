import {FormArray, FormControl, FormGroup} from '@angular/forms';

export interface TaskData {
  id: number;
  name: string;
  deadline: string;
  status: boolean;
  associatedPeople: Record<string, AssociatedPeople>;
}
export interface CreateTaskData {
  id?: number;
  name: string;
  deadline: string;
  associatedPeople: Record<string, AssociatedPeople>;
}
export interface AssociatedPeople {
  fullName: string;
  age: number;
  skills: string[];
}

export interface TodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTaskForm {
  taskName: FormControl<string>;
  deadline: FormControl<string>;
  associatedPeople: FormArray<FormGroup<CreateUserForm>>;
  [k: string]: FormControl<string> | FormArray<FormGroup<CreateUserForm>>;
}

export interface CreateUserForm {
  fullName: FormControl<string>;
  age: FormControl<string>;
  skills: FormControl<string>;
  [k: string]: FormControl<string>;
}
