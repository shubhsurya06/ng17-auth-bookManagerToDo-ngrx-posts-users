import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { IAppState } from '../store/store'; 
import { increment, decrement } from "../store/counter.action";
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {

  counter$!: Observable<number>;

  // counter store
  store = inject(Store<IAppState>);

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
