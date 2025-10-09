import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { mergeMap, Observable, of, toArray } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IAppState, IUser } from '../store/store';
import { Store, select } from '@ngrx/store';
import { decrement, increment } from '../store/counter.action';
import { getUserData } from '../store/user.action';
import { selectLoading, selectUser } from '../store/user.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  // counter data
  store = inject(Store<IAppState>);

  // user store
  userStore = inject(Store<IUser>);

  // user store selector
  user$ = this.userStore.select(selectUser);
  loading$!: Observable<boolean>;

  counter$!: Observable<number>;

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // counter related data
    this.counter$ = this.store.select('count');
  }

  ngOnInit(): void {
    console.log('login works');
    this.loading$ = this.userStore.select(selectLoading);
    this.userStore.dispatch(getUserData());

    // this.authService.userRoles$.pipe(
    //   mergeMap((res: any) => of(res)),
    //   toArray()
    // ).subscribe((res: any) => {
    //   console.log('these are user roles:', res);
    // });
  }

  login() {
    if (this.loginForm.invalid) {
      console.log('Form is not valid!');
      return;
    }

    let obj: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      expiresInMins: 10
    }

    this.authService.login(obj).subscribe((res: User) => {
      console.log('User login successfull:', res);

      // set userToken in localStorage
      if (res.accessToken) {
        this.authService.saveToken(res.accessToken);
        this.authService.saveRefreshToken(res.accessToken);
      }

      // set userData in localStorage
      this.authService.saveUserData(res);

      // start session timeout from here
      // this.authService.startSessionTimeout(obj.expiresInMins);

      // reDirect user to books component after login success
      this.router.navigate(['books']);

    });
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

}
