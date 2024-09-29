export interface TaskData {
  name: string;
  deadline: string;
  status: boolean;
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
