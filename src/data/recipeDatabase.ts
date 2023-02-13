import { CustomError } from "../error/customError";
import { BaseDatabase } from "./baseDatabase";

export class RecipeDatabase extends BaseDatabase {
    TABLE_NAME = 'TABLE_RECIPES'

    insertRecipes = async (recipes: any) => {
        try {
            RecipeDatabase.connection.initialize()
            await RecipeDatabase.connection(this.TABLE_NAME)
            .insert(recipes)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        } finally {
            console.log("conexão encerrada");
            RecipeDatabase.connection.destroy();
        }

    }
}