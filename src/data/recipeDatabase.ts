import { RecipeClass } from './../model/class/recipeClass';
import { TABLE_RECIPES } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CustomError } from '../error/customError';
import { RecipeRepository } from '../business/repository/rescieRepository';


export class RecipeDatabase extends BaseDatabase implements RecipeRepository {

    TABLE_NAME = TABLE_RECIPES

    public insertRecipe = async (recipe:RecipeClass ): Promise<void> => {
        try {

            await super.CreateItem(recipe)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };


    public getRecipeByName = async (title:string):Promise<RecipeClass> =>{
        try{

           const result = await RecipeDatabase.connection(this.TABLE_NAME).where('title',title )
           return result[0]           

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
 
}