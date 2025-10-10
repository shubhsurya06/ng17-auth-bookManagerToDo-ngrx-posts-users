import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Injectable, inject } from "@angular/core";
import { map, mergeMap } from 'rxjs';
import { getRecipeData, loadRecipeDataSuccess } from "./action";
import { RecipeService } from "./service";

@Injectable()
export class RecipesEffect {

    actions$ = inject(Actions);
    recipeService = inject(RecipeService);

    loadRecipeEffects = createEffect(() =>
        this.actions$.pipe(
            ofType(getRecipeData),
            mergeMap(() =>
                this.recipeService.getRecipeData().pipe(
                    map((recipes) => {
                        return loadRecipeDataSuccess({ recipes })
                    })
                )
            )
        )
    )

}

