import { createReducer, on } from "@ngrx/store";
import { ToDo } from "../todo.model";
import { addTodoSuccess, editTodoSuccess, loadTodoSuccess, removeToDo, removeTodoSuccess } from "./actions";

// export this todo interface, 
export interface TodoInitialState {
    todoList: ToDo[]
}

// initial state of todo
export const initialState: TodoInitialState = {
    todoList: []
}

// create reducer from here
export const todoReducer = createReducer(
    initialState,

    on(loadTodoSuccess, (state, {todoList}) => ({
        ...state,
        todoList
    })),

    on(addTodoSuccess, (state, {todo}) => ({
        ...state,
        todoList: [...state.todoList, todo]
    })),


    on(editTodoSuccess, (state, {todo}) => ({
        ...state,
        todoList: state.todoList.map((item) => item.id === todo.id ? todo: item)
    })),


    on(removeTodoSuccess, (state, {todoId}) => ({
        ...state,
        todoList: state.todoList.filter(item => item.id !== todoId)
    }))
)

