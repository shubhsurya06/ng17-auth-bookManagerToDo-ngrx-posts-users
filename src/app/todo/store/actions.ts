import { createAction, props } from "@ngrx/store";
import { ToDo } from '../todo.model'

// action to return all todo items
export const getAllToDo = createAction('[Todo] Get all todos');

// load todo success
export const loadTodoSuccess = createAction(
    '[Todo] Load todo succcess',
    props<{todoList: ToDo[]}>()
)

// action to add todo item
export const addToDo = createAction(
    '[Todo] Add todo',
    props<{title: string}>()
)

// load todo action success
export const addTodoSuccess = createAction(
    '[todo] add todo success',
    props<{todo: ToDo}>()
)

// action to add todo item
export const editToDo = createAction(
    '[Todo] Edit todo',
    props<{todo: ToDo}>()
)

// upddate todo action success
export const editTodoSuccess = createAction(
    '[Todo] Edit todo action success',
    props<{todo: ToDo}>()
)

// action to add todo item
export const removeToDo = createAction(
    '[Todo] Remove todo',
    props<{id: number}>()
)

// remove todo action success
export const removeTodoSuccess = createAction(
    '[Todo] Remove todo succcess',
    props<{todoId: number}>()
)


