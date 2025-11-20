import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Store } from '@ngrx/store';
import { IQuotes } from './model/quote-model';
import { Observable } from 'rxjs';
import { selectLoading, selectQuotes, selectError } from '../store/own-posts/quotes-selector';
import { loadActions } from '../store/own-posts/quotes-action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-own-posts',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './own-posts.component.html',
  styleUrl: './own-posts.component.scss'
})
export class OwnPostsComponent implements OnInit {

  quoteStore = inject(Store);
  $quoteLoader!: Observable<boolean>;
  $quotes!: Observable<IQuotes[]>;
  $error!: Observable<string | null>;

  constructor() {
    this.$quoteLoader = this.quoteStore.select(selectLoading);
    this.$quotes = this.quoteStore.select(selectQuotes);
    this.$error = this.quoteStore.select(selectError);
  }

  ngOnInit(): void {
    // Load quotes on component initialization
    this.loadQuotes();
  }

  loadQuotes() {
    console.log('Dispatching loadActions...');
    this.quoteStore.dispatch(loadActions());
  }

  // Keep the old method for comparison/testing if needed
  getAll() {
    this.loadQuotes();
  }
}
