export interface IRecipes {
    id: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    userId: number;
    rating: number;
    reviewCount: number;
    caloriesPerServing: number;
    name: string;
    difficulty: string;
    cuisine: string;
    image: string;
    ingredients: IIngredients[],
    instructions: IInstructions[],
    tags: ITags[],
    mealType: IMealTypes[]
}

export interface IMealTypes {
    mealType: string;
}

export interface ITags {
    tags: string;
}

export interface IInstructions {
    instructions: string;
}

export interface IIngredients {
    ingredients: string;
}