import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of } from "rxjs";
import { OwnPostsService } from "../../own-posts/service/own-posts.service";
import { getAllQuotes, loadActions, loadQuotesFailure } from "./quotes-action";
import { IQuotes } from "../../own-posts/model/quote-model";

@Injectable()
export class QuoteEffects {
    constructor() { }

    actions$ = inject(Actions);
    ownPostsService = inject(OwnPostsService);

    loadQuotes$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadActions),
            exhaustMap(() =>
                this.ownPostsService.getAllQuotes().pipe(
                    map((quotes: IQuotes[]) => {
                        console.log('API call successful, quotes loaded:', quotes);
                        return getAllQuotes({ quotes });
                    }),
                    catchError((error) => {
                        console.error('Error loading quotes:', error);
                        return of(loadQuotesFailure({ error: error.message || 'Unknown error' }));
                    })
                )
            )
        )
    );
}
