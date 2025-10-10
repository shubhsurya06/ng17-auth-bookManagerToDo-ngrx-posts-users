import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app/user';
import { of, toArray, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  token: string = 'token';
  refreshToken: string = 'refreshToken';

  userData: string = 'user';

  userRoles$ = of('admin', 'moderator', 'user');

  apiUrl = 'https://dummyjson.com/'

  constructor() { }

  returnUserRoles() {
    // return ['admin', 'moderator', 'user']
    let roles;
    this.userRoles$.pipe(
      mergeMap((res: string) => of(res)),
      toArray()
    ).subscribe((roles: string[]) => {
      roles = roles;
    });

    return roles || [];
  }

  // hit auth login  api to login user
  login(obj: User) {
    return this.http.post<any>(this.apiUrl + 'auth/login', obj);
  }

  // save user token to localStorage
  saveToken(token: string) {
    localStorage.setItem(this.token, token);
  }

  // save refresh token in localStorage
  saveRefreshToken(token: string) {
    localStorage.setItem(this.refreshToken, token);
  }

  // get user token from localStorage
  getToken() {
    let token = localStorage.getItem(this.token);
    return token || '';
  }

  // get user's refresh token from localStorage
  getRefreshToken() {
    let token = localStorage.getItem(this.refreshToken);
    return token || '';
  }

  // remove user token from localStorage
  removeToken() {
    localStorage.removeItem(this.token);
  }

  // remove user's refresh  token from localStorage
  removeRefreshToken() {
    localStorage.removeItem(this.refreshToken);
  }

  // save user details to localStorage
  saveUserData(req: User) {
    localStorage.setItem(this.userData, JSON.stringify(req));
  }

  // get user Details from localStorage
  getUserData() {
    let user = localStorage.getItem(this.userData);
    return user ? JSON.parse(user) : {};
  }

  // get auth user data
  getAuthUser() {
    return this.http.get<User>(this.apiUrl + 'user/me');
  }

  // remove user details from localStorage
  removeUserData() {
    localStorage.removeItem(this.userData);
  }

  // check user is authenticated/ login or not
  isAuthenticated() {
    let token = this.getToken();
    return !!token;
  }

  startSessionTimeout(timeoutInMins: any) {
    setTimeout(() => {
      alert('Session has been timeout!')
    }, timeoutInMins * 60000 );
  }

  startTokenRefresh() {
    let obj = {
      refreshToken: this.getRefreshToken(),
      expiresInMins: 10
    }
    return this.http.post(this.apiUrl + 'auth/refresh', obj);
  }

  logout() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.refreshToken);
    localStorage.removeItem(this.userData);
  }
}
