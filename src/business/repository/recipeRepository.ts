import { CreationRecipeReturnDTO } from './../../model/class/DTO/recipeDTOs';
import { RecipeClass } from "../../model/class/recipeClass";


export interface RecipeRepository {

    insertRecipe(recipe: RecipeClass): Promise<void>
    getRecipeByName(title: string): Promise<RecipeClass>
    getRecipeById(id: string): Promise<any>
    getUserFeed(input: string): Promise<CreationRecipeReturnDTO[]>
    updateRecipeTitle(recipeId:string, title:string):Promise<void>
    updateRecipeDescription(recipeId:string, title:string):Promise<void>
    getRecipeByIdWithoutAlias(recipeId: string):Promise<any>
    deleteRecipe(recipeId:string):Promise<void>
    deleteAllUserRecipes(userId:string):Promise<void>
 }