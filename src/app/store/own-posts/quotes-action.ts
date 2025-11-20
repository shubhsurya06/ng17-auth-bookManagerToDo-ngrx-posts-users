import { createAction, props } from "@ngrx/store";
import { IQuotes } from "../../own-posts/model/quote-model";

export const loadActions = createAction('[Quotes] loading quotes');

export const getAllQuotes = createAction(
    '[Quotes] get all quotes',
    props<{quotes: IQuotes[]}>()
);

export const loadQuotesFailure = createAction(
    '[Quotes] load quotes failure',
    props<{error: string}>()
);
