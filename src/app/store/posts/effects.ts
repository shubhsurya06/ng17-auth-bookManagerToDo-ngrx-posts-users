import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getPosts, loadPostsSuccess } from "./actions";
import { mergeMap, map } from "rxjs";
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
                        return loadPostsSuccess({ posts })
                    })
                )
            )
        )
    )


}


