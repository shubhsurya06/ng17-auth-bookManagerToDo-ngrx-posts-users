import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
import { loggingInterceptor } from './logging.interceptor';
import { provideStore } from '@ngrx/store';
import { CounterReducer } from './store/counter.reducer';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effect';
import { PostsEffects } from './store/posts/effects';
import { postsReducer } from './store/posts/reducer';
import { RecipesEffect } from './store/recipes/effects';
import { recipesReducer } from './store/recipes/reducer';
import { TodoEffects } from './todo/store/effects';
import { todoReducer } from './todo/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
    provideStore({
      count: CounterReducer,
      user: userReducer,
      posts: postsReducer,
      recipes: recipesReducer,
      todoList: todoReducer
    }),
    provideEffects([UserEffects, PostsEffects, RecipesEffect, TodoEffects])
  ]
};
