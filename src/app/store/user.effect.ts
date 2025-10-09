import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { getUserData, loadUserDataSuccess } from './user.action';
import { IUser } from './store';

@Injectable()
export class UserEffects {

    actions$ = inject(Actions);

    userService = inject(UserService);

    getUserData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getUserData),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    delay(2000),
                    map((user: any) => {
                        return loadUserDataSuccess({ user })
                    }),
                    catchError((error) => {
                        console.error('Error loading user data:', error);
                        return of(); // Return empty observable on error
                    })
                )
            )
        )
    )
}

