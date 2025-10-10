import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    http = inject(HttpClient);

    getRecipeData() {
        return this.http.get('https://dummyjson.com/recipes').pipe(
            map((data: any) => data.recipes.slice(0,10))
        )
    }

}