import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IQuoteState } from './quotes-reducer';

export const QuoteState = createFeatureSelector<IQuoteState>('quotes');

export const selectQuotes = createSelector(
    QuoteState,
    state => state.quotes
)

export const selectLoading = createSelector(
    QuoteState,
    state => state.loader
)

export const selectError = createSelector(
    QuoteState,
    state => state.error
)

