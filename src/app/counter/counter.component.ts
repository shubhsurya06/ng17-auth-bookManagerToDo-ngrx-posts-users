import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { IAppState } from '../store/store';
import { increment, decrement } from "../store/counter.action";
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule, ValidationErrors, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive, HeaderComponent, ReactiveFormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {

  counter$!: Observable<number>;

  // new form group
  myNewForm: FormGroup = new FormGroup({
    skills: new FormControl(),
    skillArray: new FormArray([])
  });

  // counter store
  store = inject(Store<IAppState>);

  ngOnInit(): void {
    this.counter$ = this.store.select('count');
  }

  get skillList(): FormArray {
    return this.myNewForm.get('skillArray') as FormArray;
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  getFormData() {
    console.log('my form data:', this.myNewForm.value);
  }

  addSkill() {
    let formArr = this.myNewForm.get('skillArray') as FormArray;
    formArr.push(
      new FormControl()
    )
  }
}
