import { RecipeClass } from "../../model/class/recipeClass"
import { GetRecipeByIdReturnDTO } from "../../model/class/DTO/recipeDTOs"

export interface RecipeRepository{

    insertRecipe(recipe: RecipeClass):Promise<void>
    getRecipeByName(title:string):Promise<RecipeClass>
    getRecipeById(id: string):Promise<any>   
    getUserFeed(input:string):Promise<any>
}