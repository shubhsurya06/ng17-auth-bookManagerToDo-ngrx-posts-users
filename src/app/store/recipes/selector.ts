import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IRecipeState } from "./reducer";

export const RecipeState = createFeatureSelector<IRecipeState>('recipes');

export const selectRecipe = createSelector(
    RecipeState,
    state => state.recipes
)

export const selectLoading = createSelector(
    RecipeState,
    state => state.loading
)


