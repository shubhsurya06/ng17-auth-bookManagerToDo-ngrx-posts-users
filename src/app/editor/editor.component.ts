import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';


import { Store, select } from "@ngrx/store";
import { IAppState } from '../store/store'; 
import { increment, decrement } from "../store/counter.action";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {

  counter$!: Observable<number>;
  store = inject(Store<IAppState>);

  ngOnInit(): void {
    this.counter$ = this.store.select('count');
  }

}
