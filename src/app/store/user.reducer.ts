import { createReducer, on } from "@ngrx/store";
import { getUserData, loadUserDataSuccess } from "./user.action";
import { IUser } from './store';

export interface UserState {
    user: IUser | null,
    loading: boolean,
}

export const initialState : UserState = {
    user: null,
    loading: false
}


export const userReducer = createReducer(
    initialState,
    on(getUserData, state => ({
        ...state,
        loading: true
    })),
    on(loadUserDataSuccess, (state, {user}) => ({
        ...state,
        user,
        loading: false
    }))
);






