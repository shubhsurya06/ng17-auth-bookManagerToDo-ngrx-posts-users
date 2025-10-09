import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getPosts, loadPostsSuccess } from "./actions";
import { IPosts } from "./model";
import { mergeMap, pipe, map } from "rxjs";
import { PostService } from "./service";

@Injectable()
export class PostsEffects {

    actions$ = inject(Actions);
    postService = inject(PostService);

    loadPostsEffects = createEffect(() =>
        this.actions$.pipe(
            ofType(getPosts),
            mergeMap(() =>
                this.postService.getPosts().pipe(
                    map((posts: any) => {
                        // let posts = data.posts.slice(0, 10);
                        return loadPostsSuccess({ posts })
                    })
                )
            )
        )
    )


}


