import { Component, inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { IPosts } from '../store/posts/model';
import { Observable } from 'rxjs';
import { selectPosts } from '../store/posts/selector';
import { selectLoading } from '../store/user.selector';
import { getPosts } from '../store/posts/actions';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  postStore = inject(Store<IPosts>);
  posts$!: Observable<IPosts[]>;
  loading$!: Observable<Boolean>;

  constructor() {
    this.posts$ = this.postStore.select(selectPosts);
    this.loading$ = this.postStore.select(selectLoading);
  }

  ngOnInit(): void {
    
    // this.posts$ = this.postStore.select(selectPosts);
    // this.loading$ = this.postStore.select(selectLoading);

    this.postStore.dispatch(getPosts());

  }


}
