import { Injectable } from '@angular/core';
import { ToDo } from './todo.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    todo1: ToDo = {
        id: Date.now(),
        title: 'Task 1',
        isCompleted: false
    }
    private todoList: ToDo[] = [this.todo1];

    getAllTodos(): Observable<ToDo[]> {
        return of([...this.todoList]).pipe(delay(200));
    }

    addTodo(title: string): Observable<ToDo> {
        let obj1: ToDo = {
            id: Date.now(),
            title: title,
            isCompleted: false
        }

        this.todoList.push(obj1);
        return of(obj1).pipe(delay(200));
    }

    editTodo(todo: ToDo): Observable<ToDo> {
        let index = this.todoList.findIndex((item: ToDo) => item.id === todo.id);
        if (index !== -1) {
            this.todoList[index].title = todo.title;
            const updated: ToDo = this.todoList[index];
            return of(updated).pipe(delay(200));
        }
        return of(undefined as unknown as ToDo).pipe(delay(200));
    }

    removeTodo(id: number) {
        this.todoList = this.todoList.filter(item => item.id != id);
        return of(id).pipe(delay(300));
    }


}