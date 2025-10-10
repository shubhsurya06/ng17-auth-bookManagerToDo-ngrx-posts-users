import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IPosts } from '../store/posts/model';
import { Observable } from 'rxjs';
import { selectPosts, selectLoading } from '../store/posts/selector';
import { getPosts } from '../store/posts/actions';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  postStore = inject(Store<IPosts>);
  posts$!: Observable<IPosts[]>;
  loading$!: Observable<boolean>;

  constructor() {
    this.posts$ = this.postStore.select(selectPosts);
    this.loading$ = this.postStore.select(selectLoading);
  }

  ngOnInit(): void {
    this.postStore.dispatch(getPosts());
  }


}
