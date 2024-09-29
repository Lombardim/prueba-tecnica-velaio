import {Component, Input, OnInit} from '@angular/core';
import {AssociatedPeople, TaskData} from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() taskData!: TaskData;
  associatedPeople: AssociatedPeople[] = [];

  ngOnInit() {
    for(let person in this.taskData.associatedPeople) {
      this.associatedPeople.push(this.taskData.associatedPeople[person]);
    }
  }
}
