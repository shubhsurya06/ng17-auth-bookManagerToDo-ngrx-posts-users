import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../book.model';
import { BookServiceService } from '../book-service.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../user';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLinkActive, RouterLink, HeaderComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  heading: string = 'Book Manager using Signal API';

  bookService = inject(BookServiceService);
  authService = inject(AuthService);
  router = inject(Router);

  // user data
  userData = signal<User | null>(null);

  // this is book form
  bookForm: FormGroup;

  // editing book
  isEditMode: boolean = false;
  editBookId: number = 0;

  categoryList: string[] = ['All'];

  private readonly booksSignal = signal<Book[]>([
    // { id: 1, title: 'Angular 19', author: 'John Doe', category: 'Programming' },
    // { id: 2, title: 'React 18', author: 'Jane Doe', category: 'Programming' },
  ]);

  // this is book list
  // books: Signal<Book[]> = signal([
  //   { id: 1, title: 'Angular 19', author: 'John Doe', category: 'Programming' },
  //   { id: 2, title: 'React 18', author: 'Jane Doe', category: 'Programming' },
  // ]);

  books$ = this.booksSignal();

  constructor(private readonly fb: FormBuilder) {
    // get books details from localStorage using booksService
    this.booksSignal.set(this.bookService.getBooks());
    this.books$ = this.booksSignal();

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required]
    });

    for (let item of this.books$) {
      if (!this.categoryList.includes(item.category)) {
        this.categoryList.push(item.category);
      }
    }
  }

  ngOnInit(): void {
    // get user details from localStorage using authService
    this.getAuthUser();
  }

  getAuthUser() {
    this.authService.getAuthUser().subscribe((res: User) => {
      this.userData.set(res);
    })
  }

  addBook() {
    if (this.bookForm.valid) {
      const newBook: Book = {
        id: Math.floor(Math.random() * 1000),
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        category: this.bookForm.value.category
      }

      if (!this.categoryList.includes(newBook.category)) {
        this.categoryList.push(newBook.category);
      }

      this.bookForm.reset();

      this.booksSignal.set([...this.booksSignal(), newBook]);
      this.books$ = this.booksSignal();
      this.bookService.saveBooks(this.books$);
    }
  }

  updateBook() {
    if (this.bookForm.invalid) {
      return;
    }

    const updatedBooks = this.booksSignal().map((book) => {
      if (book.id === this.editBookId) {
        book.title = this.bookForm.value.title;
        book.author = this.bookForm.value.author;
        book.category = this.bookForm.value.category;

        if (!this.categoryList.includes(this.bookForm.value.category)) {
          this.categoryList.push(this.bookForm.value.category);
        }
      }
      return book;
    })

    this.bookForm.reset();

    this.booksSignal.set(updatedBooks);
    this.books$ = this.booksSignal();
    this.bookService.saveBooks(this.books$);
  }

  editBook(book: Book) {
    this.isEditMode = true;
    this.editBookId = book.id;
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      category: book.category
    });
  }

  deleteBook(id: number) {
    const updateBooks = this.booksSignal().filter(book => id !== book.id);
    this.booksSignal.set(updateBooks);
    this.books$ = this.booksSignal();
    this.bookService.saveBooks(this.books$);
  }

  applyFilter(value: string) {
    const filterValue = value;
    console.log('this is filter value:', filterValue);

    if (filterValue === 'All') {
      this.books$ = this.booksSignal();
      this.bookService.saveBooks(this.books$);
      console.log('ALL BOOKS:', this.books$);
    } else {
      this.books$ = this.booksSignal().filter(item => item.category === filterValue);
      console.log('FILTERED BOOKS:', this.books$);
    }
  }

  logout() {
    this.authService.removeToken();
    this.authService.removeUserData();
    this.router.navigate(['login']);
  }
}
