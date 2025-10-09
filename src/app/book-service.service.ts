import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  
  key: string = 'books';

  constructor() { }

  getBooks() {
    let books = localStorage.getItem(this.key);
    return books ? JSON.parse(books) : [];
  }

  saveBooks(list: any[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }


}
