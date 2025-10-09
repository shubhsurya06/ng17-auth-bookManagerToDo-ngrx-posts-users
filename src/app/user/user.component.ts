import { Component, inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IUser } from '../store/store';
import { Observable } from 'rxjs';
import { getUserData } from '../store/user.action';
import { selectUser, selectLoading } from '../store/user.selector';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  // user store
  store = inject(Store<IUser>);

  user$ = this.store.select(selectUser);
  loading$!: Observable<Boolean>;

  constructor() {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(getUserData());
  }

}
