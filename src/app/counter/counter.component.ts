import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Store, select } from "@ngrx/store";
import { IAppState, IUser } from '../store/store'; 
import { increment, decrement } from "../store/counter.action";
import { Observable } from 'rxjs';
import { selectLoading, selectUser } from '../store/user.selector';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  counter$!: Observable<number>;

  // counter store
  store = inject(Store<IAppState>);

  // user store
  userStore = inject(Store<IUser>);

  user$ = this.userStore.select(selectUser);
  loading$ = this.userStore.select(selectLoading);

  ngOnInit(): void {
    this.counter$ = this.store.select('count');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
}
