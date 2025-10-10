import { Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ITasks } from './task-model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { TaskService } from './task.service';
import { BackgroundDirective } from './background.directive';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, NgClass, AsyncPipe, BackgroundDirective],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  taskService = inject(TaskService);

  taskForm!: FormGroup;
  isEdit: boolean = false;
  editId: number = 0;

  taskSignal = signal<ITasks[]>([]);
  tasks$ = this.taskSignal();

  constructor(private readonly fb: FormBuilder) {
    this.taskSignal.set(this.taskService.getTasks());
    this.tasks$ = this.taskSignal();
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [''],
      task: ['', Validators.required],
      isCompleted: []
    });
  }

  addEditTasks() {
    if (this.taskForm.valid) {

      // add update functionality here
      if (this.isEdit && this.editId) {
        let obj: ITasks = {
          id: this.editId,
          task: this.taskForm.value.task,
          isCompleted: false
        }
        this.taskForm.reset();

        // get edited task id from taskSignal() and set new task value to it and return it to tasks;
        let tasks = this.taskSignal().map((item) => {
          if (item.id === this.editId) {
            item.task = obj.task;
          }
          return item;
        })

        this.taskSignal.set(tasks);
        this.tasks$ = this.taskSignal();
        this.taskService.saveTasks(this.tasks$);

        this.isEdit = false;
        this.editId = 0;
        return;
      }

      // handle save functionality from here
      let obj: ITasks = {
        id: new Date().getTime(),
        task: this.taskForm.value.task,
        isCompleted: false
      }
      this.taskForm.reset();

      this.taskSignal.set([...this.taskSignal(), obj]);
      this.tasks$ = this.taskSignal();
      this.taskService.saveTasks(this.tasks$);
    }
  }

  edit(task: ITasks) {
    this.isEdit = true;
    this.editId = task.id;
    this.taskForm.patchValue({
      id: task.id,
      task: task.task,
      isCompleted: task.isCompleted
    })
  }

  delete(task: ITasks) {
    const updateTasks = this.taskSignal().filter(item => task.id != item.id);
    this.taskSignal.set(updateTasks);
    this.tasks$ = this.taskSignal();
    this.taskService.saveTasks(this.tasks$);
  }

  taskCompleted(task: ITasks) {
    task.isCompleted = !task.isCompleted;

    let tasks = this.taskSignal().map((item) => {
      if (item.id === task.id) {
        item.isCompleted = task.isCompleted;
      }
      return item;
    })

    this.taskSignal.set(tasks);
    this.tasks$ = this.taskSignal();
    this.taskService.saveTasks(this.tasks$);
  }

}
