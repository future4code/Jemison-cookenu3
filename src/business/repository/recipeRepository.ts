import { CreationRecipeReturnDTO } from './../../model/class/DTO/recipeDTOs';
import { RecipeClass } from "../../model/class/recipeClass";


export interface RecipeRepository{

    insertRecipe(recipe: RecipeClass):Promise<void>
    getRecipeByName(title:string):Promise<RecipeClass>
    getRecipeById(id: string):Promise<any>   
    getUserFeed(input:string):Promise<CreationRecipeReturnDTO[]>
}