import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  AssociatedPeople,
  CreateTaskData,
  CreateTaskForm,
  CreateUserForm,
} from '../../../../shared/interfaces/task.interface';
import {SharedModule} from '../../../../shared/shared.module';
import {CustomSelectOption} from '../../../../shared/interfaces/custom.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../../../shared/services/task.service';
import {ToastrService} from 'ngx-toastr';
import {ToastrConfigModule} from '../../../../shared/config/toastr.config.module';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-task-action',
  templateUrl: './task-action.component.html',
  styleUrls: ['./task-action.component.scss'],
  imports: [
    CommonModule,
    ToastrConfigModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TaskActionComponent implements OnInit {
  readonly taskFields: Record<string, string> = {
    'taskName': 'HOME.ACTION.TASK-NAME',
    'deadline': 'HOME.ACTION.DEADLINE',
    'fullName': 'HOME.ACTION.FULL-NAME',
    'age': 'HOME.ACTION.AGE',
  };
  readonly selectOptions: CustomSelectOption[] = [
    {
      name: 'HOME.ACTION.EDIT-PERSON',
      value: 'edit',
    },
    {
      name: 'HOME.ACTION.REMOVE-PERSON',
      value: 'remove'
    },
  ];
  minDate = '';
  addedNames: string[] = [];
  taskForm: FormGroup<CreateTaskForm> = new FormGroup<CreateTaskForm>({
    'taskName': new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    'deadline': new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    'associatedPeople': new FormArray<FormGroup<CreateUserForm>>([
      this.generatePersonForm(),
    ]),
  });
  initialForm?: FormGroup<CreateTaskForm>;
  addedSkills: Record<number, string[]> = {
    0: [],
  };
  initialAddedSkills: Record<number, string[]> = {
    0: [],
  };
  editPersonForm?: FormGroup<CreateUserForm>;
  editingPerson = 0;
  showCancelButton = false;
  creatingPerson = false;
  type = 'create';
  editingTaskId?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private translate: TranslateService,
    private toast: ToastrService,
  ) {}
  async ngOnInit() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.minDate = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    await this.validateActionType();
  }

  set taskName(name: string) {
    this.taskForm.controls.taskName.setValue(name);
  }
  set deadline(name: string) {
    this.taskForm.controls.deadline.setValue(name);
  }
  get associatedPeople(): FormArray<FormGroup<CreateUserForm>> {
    return this.taskForm.controls.associatedPeople;
  }
  async validateActionType() {
    const params: Params = this.route.snapshot.queryParams;
    if (params['type']) {
      this.type = params['type'];
    }
    let errorOccurredWithId = true;
    this.showCancelButton = this.type === 'edit';
    if (this.type === 'edit' && params['taskId']) {
      try {
        const tasks = await this.taskService.getAllTasks();
        const task = tasks.find((t) => t.id === parseInt(params['taskId']));
        this.editingTaskId = parseInt(params['taskId']);
        if (task) {
          this.initialForm = new FormGroup<CreateTaskForm>({
            'taskName': new FormControl<string>(task.name, {
              validators: [Validators.required],
              nonNullable: true
            }),
            'deadline': new FormControl<string>(task.deadline, {
              validators: [Validators.required],
              nonNullable: true
            }),
            'associatedPeople': new FormArray<FormGroup<CreateUserForm>>([
              this.generatePersonForm(),
            ]),
          });
          this.taskName = task.name;
          this.deadline = task.deadline;
          let count = 0;
          const n = Array.from(Object.keys(task.associatedPeople)).length;
          for (const name in task.associatedPeople) {
            const associatedPeople = this.associatedPeople.controls[count];
            const initialForm = this.initialForm.controls.associatedPeople.controls[count];
            if (associatedPeople) {
              this.addedNames.push(task.associatedPeople[name].fullName);
              associatedPeople.controls.fullName.setValue(task.associatedPeople[name].fullName);
              initialForm.controls.fullName.setValue(task.associatedPeople[name].fullName);
              associatedPeople.controls.age.setValue(task.associatedPeople[name].age.toString());
              initialForm.controls.age.setValue(task.associatedPeople[name].age.toString());
              task.associatedPeople[name].skills.forEach((skill) => {
                this.addedSkills[count].push(skill);
                this.initialAddedSkills[count].push(skill);
              });
              count++;
              if (count < n) {
                this.addPersonForm();
              }
            }
          }
          this.editingPerson = -1;
          this.creatingPerson = false;
          errorOccurredWithId = false;
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (this.type === 'edit' && errorOccurredWithId) {
      this.toast.error('No se encontró el ID');
      await this.goBack();
    }
  }
  async goBack() {
    await this.router.navigateByUrl('/home/list');
  }
  generatePersonForm(): FormGroup<CreateUserForm> {
    return new FormGroup({
      'fullName': new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      'age': new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.min(18),
          Validators.pattern('[0-9]+'),
        ],
        nonNullable: true,
      }),
      'skills': new FormControl<string>('', {
        nonNullable: true,
      }),
    });
  }
  addPersonForm(): void {
    this.showCancelButton = true;
    this.associatedPeople.push(this.generatePersonForm());
    if (!this.addedSkills[this.associatedPeople.length - 1]) {
      this.addedSkills[this.associatedPeople.length - 1] = [];
    }
    if (this.initialForm) {
      this.initialForm.controls.associatedPeople.push(this.generatePersonForm());
      if (!this.initialAddedSkills[this.associatedPeople.length - 1]) {
        this.initialAddedSkills[this.associatedPeople.length - 1] = [];
      }
    }
    this.creatingPerson = true;
    this.editingPerson = this.associatedPeople.length - 1;
  }
  removePersonForm(i: number, force = false): void {
    if (this.creatingPerson || force) {
      this.associatedPeople.removeAt(i);
      if (this.addedSkills[i]) {
        delete this.addedSkills[i];
      }
    } else if (this.editPersonForm) {
      this.associatedPeople.controls[i].controls.fullName.setValue(this.editPersonForm.controls.fullName.value);
      this.associatedPeople.controls[i].controls.age.setValue(this.editPersonForm.controls.age.value);
      this.associatedPeople.controls[i].controls.skills.setValue(this.editPersonForm.controls.skills.value);
      this.editPersonForm = undefined;
    }
    this.creatingPerson = false;
  }
  cancelAddPerson(i: number): void {
    this.editingPerson = -1;
    this.removePersonForm(i);
  }
  addPerson(i: number): void {
    const associatedPerson = this.associatedPeople.controls[i];
    if (this.addedNames.includes(associatedPerson.controls.fullName.value) && this.creatingPerson) {
      this.toast.error(this.translate.instant('GLOBAL.ERROR.NAME-EXISTS'));
    } else {
      if (associatedPerson.valid && this.addedSkills[i].length > 0) {
        this.editingPerson = -1;
      } else {
        this.toast.error(this.detectPersonInvalidField(associatedPerson, i));
      }
    }
  }
  detectPersonInvalidField(associatedPerson: FormGroup<CreateUserForm>, i: number) {
    if (associatedPerson.controls.fullName.hasError('required')) {
      return `${this.translate.instant('HOME.ACTION.FULL-NAME').toUpperCase()}: ${this.translate.instant('GLOBAL.ERROR.REQUIRED')}`;
    }
    if (associatedPerson.controls.fullName.hasError('minlength')) {
      return `${this.translate.instant('HOME.ACTION.FULL-NAME').toUpperCase()}: ${this.translate.instant('GLOBAL.ERROR.MIN-LENGTH').replace('[MIN-LENGTH]', '5')}`;
    }
    if (associatedPerson.controls.age.hasError('required')) {
      return `${this.translate.instant('HOME.ACTION.AGE').toUpperCase()}: ${this.translate.instant('GLOBAL.ERROR.REQUIRED')}`;
    }
    if (associatedPerson.controls.age.hasError('min')) {
      return `${this.translate.instant('HOME.ACTION.AGE').toUpperCase()}: ${this.translate.instant('GLOBAL.ERROR.MIN').replace('[MIN-VALUE]', '18')}`;
    }
    if (this.addedSkills[i].length === 0) {
      return this.translate.instant('GLOBAL.ERROR.NO-SKILLS');
    }
    return this.translate.instant('GLOBAL.ERROR.DEFAULT');
  }
  async taskFormAction(): Promise<void> {
    if (this.taskForm.valid) {
      if (this.type === 'edit') {
        if (this.compareForms()) {
          await this.goBack();
        }
      }
      try {
        const body: CreateTaskData = this.getCreateBody();
        if (this.type === 'edit') {
          body.id = this.editingTaskId;
          await this.taskService.updateTask(body);
          this.toast.success(this.translate.instant('HOME.ACTION.EDIT-TASK'));
        } else {
          await this.taskService.createTask(body);
          this.toast.success(this.translate.instant('HOME.ACTION.CREATE-TASK'));
        }
        await this.goBack();
      } catch (e) {
        console.error(e);
      }
    } else {
      this.toast.error(this.detectInvalidField());
    }
  }
  detectInvalidField() {
    for(const field in this.taskForm.controls) {
      if (field !== 'associatedPeople') {
        if (this.taskForm.controls[field].invalid && this.taskForm.controls[field].errors) {
          return `${this.translate.instant(this.taskFields[field]).toUpperCase()}: ${this.checkErrorType(this.taskForm.controls[field] as FormControl)}`;
        }
      }
    }
    return this.translate.instant('GLOBAL.ERROR.DEFAULT');
  }
  compareForms(): boolean {
    let equalForms = false;
    if (this.initialForm) {
      equalForms = this.initialForm.controls.taskName.value === this.taskForm.controls.taskName.value;
      if (equalForms) {
        equalForms = this.initialForm.controls.deadline.value === this.taskForm.controls.deadline.value;
      }
    }
    if (this.initialAddedSkills && equalForms) {
      const initialPeople: string[] = Object.keys(this.initialAddedSkills);
      const currentPeople: string[] = Object.keys(this.addedSkills);
      equalForms = initialPeople.join(',') === currentPeople.join(',');
    }
    return equalForms;
  }
  getCreateBody(): CreateTaskData {
    const associatedPeople: Record<string, AssociatedPeople> = {};
    for(const field in this.associatedPeople.controls) {
      const person = this.associatedPeople.controls[field].controls;
      associatedPeople[person.fullName.value] = {
        fullName: person.fullName.value,
        age: Number(person.age.value),
        skills: this.addedSkills[field],
      };
    }

    return {
      name: this.taskForm.controls.taskName.value,
      deadline: this.taskForm.controls.deadline.value,
      associatedPeople,
    };
  }
  checkErrorType(control: FormControl): string {
    if (control.hasError('required')) {
      return this.translate.instant('GLOBAL.ERROR.REQUIRED');
    }
    if (control.hasError('min')) {
      return this.translate.instant('GLOBAL.ERROR.MIN').replaceAll('[MIN-VALUE]', '18');
    }
    if (control.hasError('minlength')) {
      return this.translate.instant('GLOBAL.ERROR.MIN-LENGTH').replaceAll('[MAX-LENGTH]', '5');
    }
    if (control.hasError('pattern')) {
      return this.translate.instant('GLOBAL.ERROR.PATTERN');
    }
    return this.translate.instant('GLOBAL.ERROR.DEFAULT');
  }
  addSkill(i: number) {
    if (this.associatedPeople.controls[i]) {
      const skill = this.associatedPeople.controls[i].controls.skills.value;
      if (skill !== '') {
        this.addedSkills[i].push(skill);
        this.associatedPeople.controls[i].controls.skills.reset('');
      } else {
        this.toast.error(this.translate.instant('GLOBAL.ERROR.EMPTY-SKILL'));
      }
    }
  }
  removeSkill(addedSkills: string[], i: number) {
    addedSkills.splice(i, 1);
  }
  moreOptionsAction(option: string, i: number) {
    switch(option) {
      case 'edit': {
        this.showCancelButton = true;
        this.editingPerson = i;
        this.editPersonForm = this.generatePersonForm();
        this.editPersonForm.controls.fullName.setValue(this.associatedPeople.controls[i].controls.fullName.value);
        this.editPersonForm.controls.age.setValue(this.associatedPeople.controls[i].controls.age.value);
        this.editPersonForm.controls.skills.setValue(this.associatedPeople.controls[i].controls.skills.value);
        break;
      }
      case 'remove': {
        this.removePersonForm(i, true);
        this.associatedPeople.markAsDirty();
        break;
      }
    }
  }
}
