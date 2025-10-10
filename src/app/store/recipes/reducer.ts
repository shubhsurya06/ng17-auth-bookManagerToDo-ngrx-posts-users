import { createReducer, on } from "@ngrx/store";
import { getRecipeData, loadRecipeDataSuccess } from "./action";
import { IRecipes } from "./model";

export interface IRecipeState {
    recipes: IRecipes[],
    loading: boolean
}

export const initialRecipeState : IRecipeState = {
    recipes: [],
    loading: false
}

export const recipesReducer = createReducer(
    initialRecipeState,

    on(getRecipeData, state => ({
        ...state,
        loading: true
    })),

    on(loadRecipeDataSuccess, (state, {recipes}) => ({
        ...state,
        recipes,
        loading: false
    }))
)