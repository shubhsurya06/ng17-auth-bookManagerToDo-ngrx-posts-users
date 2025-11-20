import { createReducer, on } from "@ngrx/store";
import { loadActions, getAllQuotes, loadQuotesFailure } from "./quotes-action";
import { IQuotes } from "../../own-posts/model/quote-model";

export interface IQuoteState {
    quotes: IQuotes[], 
    loader: boolean,
    error: string | null
}

export const initialQuotes: IQuoteState = {
    quotes: [],
    loader: false,
    error: null
}

export const QuotesReducer = createReducer(
    initialQuotes,

    on(loadActions, (state) => {
        return {
            ...state,
            loader: true,
            error: null
        }
    }),

    on(getAllQuotes, (state, {quotes}) => ({
        ...state,
        quotes,
        loader: false,
        error: null
    })),

    on(loadQuotesFailure, (state, {error}) => ({
        ...state,
        loader: false,
        error
    }))
)