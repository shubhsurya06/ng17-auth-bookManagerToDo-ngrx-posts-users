import { Component, OnInit, inject, signal} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { IRecipes } from '../store/recipes/model';
import { selectLoading, selectRecipe } from '../store/recipes/selector';
import { getRecipeData } from '../store/recipes/action';
import { IAppState } from '../store/store';
import { increment, decrement } from '../store/counter.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit{
  // recipes store
  recipeStore = inject(Store<IRecipes>);
  recipeSignal = signal<IRecipes[]>([]);
  loadingSignal = signal<boolean>(false);

  // counter store
  counterStore = inject(Store<IAppState>);
  counter$!: Observable<IAppState>;

  constructor() {
    let loading$ = this.recipeStore.select(selectLoading);
    loading$.subscribe(flag => this.loadingSignal.set(flag));
  }

  ngOnInit(): void {
    this.counter$ = this.counterStore.select('count');

    let recipes$ = this.recipeStore.select(selectRecipe);
    recipes$.subscribe(data => this.recipeSignal.set(data));
    
    this.recipeStore.dispatch(getRecipeData());
  }

  increment() {
    this.counterStore.dispatch(increment());
  }

  decrement() {
    this.counterStore.dispatch(decrement());
  }

}
