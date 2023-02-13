import { RecipeClass } from "../../model/class/recipeClass"

export interface RecipeRepository{

    insertRecipe(recipe: RecipeClass):Promise<void>
    getRecipeByName(title:string):Promise<RecipeClass>
    
}