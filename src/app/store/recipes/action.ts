import { createAction, props } from "@ngrx/store";
import { IRecipes } from "./model";

export const getRecipeData = createAction('[Get Recipe Data], get all recipe data from API');

export const loadRecipeDataSuccess = createAction(
    '[Load Recipe Data Success]',
    props<{recipes: IRecipes[]}>()
)
