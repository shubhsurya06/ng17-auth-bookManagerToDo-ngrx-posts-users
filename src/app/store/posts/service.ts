import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    http = inject(HttpClient);

    getPosts() {
        return this.http.get('https://dummyjson.com/posts').pipe(
            delay(2000),
            map((data: any) => data.posts.slice(0, 10))
        )
    }
}