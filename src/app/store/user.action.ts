import { createAction, props } from "@ngrx/store";
import { IUser } from './store';


export const getUserData = createAction('[Get User Data from API] Get User Data');

export const loadUserDataSuccess = createAction(
    '[Load User Data] Load User data after received from API',
    props<{ user: IUser }>()
);