import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    http = inject(HttpClient);

    getPosts() {
        return this.http.get('https://dummyjson.com/posts').pipe(
            map((data: any) => data.posts.slice(0, 10))
        )
    }
}