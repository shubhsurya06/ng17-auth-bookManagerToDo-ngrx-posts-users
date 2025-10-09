import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  constructor() { }

  getUsers() {
    return this.http.get('https://dummyjson.com/users/1');
  }

}
