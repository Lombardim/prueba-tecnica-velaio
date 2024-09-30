import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AssociatedPeople, TaskData} from '../../interfaces/task.interface';
import {CustomSelectOption} from '../../interfaces/custom.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit, OnChanges {
  @Input() taskData!: TaskData;
  @Output() moreOptionsAction: EventEmitter<string> = new EventEmitter<string>();
  readonly selectOptions: CustomSelectOption[] = [
    {
      name: 'HOME.LIST.EDIT-TASK',
      value: 'edit',
    },
    {
      name: 'HOME.LIST.MARK-AS-COMPLETED',
      value: 'updateStatus'
    },
    {
      name: 'HOME.LIST.DELETE-TASK',
      value: 'delete'
    },
  ];
  options: CustomSelectOption[] = [];
  associatedPeople: AssociatedPeople[] = [];

  ngOnInit() {
    this.options = this.selectOptions.filter((option) =>
      this.taskData.status ? option.value !== 'updateStatus' : true);
    for(const person in this.taskData.associatedPeople) {
      this.associatedPeople.push(this.taskData.associatedPeople[person]);
    }
  }
  ngOnChanges() {
    this.options = this.selectOptions.filter((option) =>
      this.taskData.status ? option.value !== 'updateStatus' : true);
  }
}
