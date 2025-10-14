import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { selectTodoList } from './store/selector';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToDo } from './todo.model';
import * as TodoActions from './store/actions';
import { AsyncPipe, NgClass } from '@angular/common';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {

  title!: string;
  todoForm!: FormGroup;
  isEditMode: boolean = false;
  editTaskId: number = 0;

  strike!: string;

  todoService = inject(TodoService);

  todoStore = inject(Store<ToDo>);
  todoList$: Observable<ToDo[]> = this.todoStore.select(selectTodoList);

  constructor(private readonly fb: FormBuilder) {
    this.todoForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      isCompleted: ['']
    })
  }

  ngOnInit(): void {
    this.todoStore.dispatch(TodoActions.getAllToDo());
  }

  addTask(): void {
    if (this.todoForm.valid) {

      if (this.isEditMode && this.editTaskId) {
        let task: ToDo = {
          id: Date.now(),
          title: this.todoForm.value.title,
          isCompleted: false
        }

        this.todoStore.dispatch(TodoActions.editToDo({ todo: task }));
        this.todoForm.reset();
        this.isEditMode = false;
        this.editTaskId = 0;
        return;
      }

      let task: ToDo = {
        id: Date.now(),
        title: this.todoForm.value.title,
        isCompleted: false
      }
      this.todoStore.dispatch(TodoActions.addToDo({ title: task.title }));
      this.todoForm.reset();
    }
  }

  dispatchAddEdit(title: string) {
    
  }

  editItem(item: ToDo) {
    this.isEditMode = true;
    this.editTaskId = item.id;
    this.todoForm.patchValue({ ...item })
  }

  deleteItem(item: ToDo) {
    let value = confirm(`Are you sure want to delete task ${item.title}?`);
    if (value) {
      let id = item.id;
      this.todoStore.dispatch(TodoActions.removeToDo({ id }));
    }
  }

}
