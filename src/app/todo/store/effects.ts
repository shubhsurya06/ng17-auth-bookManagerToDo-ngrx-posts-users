import { createEffect, Actions, ofType } from "@ngrx/effects";
import { ToDo } from "../todo.model";
import { Injectable, inject } from "@angular/core";
import { TodoService } from "../todo.service";
import * as TodoActions from './actions';
import { switchMap, map } from "rxjs";

@Injectable()
export class TodoEffects {

    actions = inject(Actions);
    todoService = inject(TodoService);

    loadTodoSuccess$ = createEffect(() => 
        this.actions.pipe(
            ofType(TodoActions.getAllToDo),
            switchMap(() => 
                this.todoService.getAllTodos().pipe(
                    map(todoList => TodoActions.loadTodoSuccess({todoList}))
                )
            )
        )
    )

    addTodo$ = createEffect(() =>
        this.actions.pipe(
            ofType(TodoActions.addToDo),
            switchMap(({title}) => 
                this.todoService.addTodo(title).pipe(
                    map(todo => TodoActions.addTodoSuccess({todo}))
                )
            )
        )
    )

    editTodoSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(TodoActions.editToDo),
            switchMap(({todo}) => 
                this.todoService.editTodo(todo).pipe(
                    map(todo => TodoActions.editTodoSuccess({todo}))
                )
            )
        )
    )

    deleteTodoSuccess$ = createEffect(() => 
        this.actions.pipe(
            ofType(TodoActions.removeToDo),
            switchMap(({id}) =>
                this.todoService.removeTodo(id).pipe(
                    map(todoId => TodoActions.removeTodoSuccess({todoId}))
                )
            )
        )
    )

}



