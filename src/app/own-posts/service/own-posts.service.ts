import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnPostsService {

  http = inject(HttpClient)

  constructor() { 

  }

  getAllQuotes () {
    return this.http.get('https://dummyjson.com/quotes').pipe(
      map((res: any) => res.quotes)
    );
  }
}
