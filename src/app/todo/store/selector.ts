import { createSelector, createFeatureSelector } from "@ngrx/store";
import {TodoInitialState} from './reducers';

export const TodoInitialSelector = createFeatureSelector<TodoInitialState>('todoList');

export const selectTodoList = createSelector(
    TodoInitialSelector,
    state => state.todoList
)


