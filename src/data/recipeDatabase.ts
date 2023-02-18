import { RecipeClass } from './../model/class/recipeClass';
import { TABLE_RECIPES, TABLE_USERS } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CustomError } from '../error/customError';
import { RecipeRepository } from '../business/repository/recipeRepository';




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
 
   

    public getRecipeById = async (recipeId: string):Promise<any> => {
        try {
           const result = await RecipeDatabase.connection.raw(`
                SELECT r.id AS "ID da Receita", r.title AS "Nome da Receita",
                r.description AS "Modo de Preparo",  DATE_FORMAT(STR_TO_DATE(r.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "Receita enviada em",
                u.name AS "Postado por", u.id AS "ID do Autor"
                FROM ${this.TABLE_NAME} r
                INNER JOIN ${TABLE_USERS} u ON u.id = r.author_id_fk
                WHERE r.id = "${recipeId}";
           `)
          
           return result[0]
            
        } catch (error: any) {
            throw new Error (error.message)
        }
    };

    public getRecipeByIdWithoutAlias = async (recipeId: string):Promise<any> => {
        try {
           const result = await RecipeDatabase.connection(this.TABLE_NAME).where('id', recipeId)
                    
           return result[0]
            
        } catch (error: any) {
            throw new Error (error.message)
        }
    };

    public getUserFeed = async (input:string):Promise<any> => {
        try {
           const result = await RecipeDatabase.connection.raw(`
                SELECT r.id AS "ID da Receita", r.title AS "Nome da Receita",
                r.description AS "Modo de Preparo",  DATE_FORMAT(STR_TO_DATE(r.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "Receita enviada em",
                u.name AS "Postado por", u.id AS "ID do Autor"
                FROM ${this.TABLE_NAME} r
                INNER JOIN ${TABLE_USERS} u ON u.id = r.author_id_fk
                WHERE ${input}
                ORDER BY r.created_at DESC
           `)
          
           return result[0]
            
        } catch (error: any) {
            throw new Error (error.message)
        }
    };

    public updateRecipeTitle = async(recipeId:string, title:string):Promise<void>=>{
        try{
            await RecipeDatabase.connection(this.TABLE_NAME).update('title', title).where('id', recipeId)

        }catch (error: any) {
            throw new Error (error.message)
        }
    };
    public updateRecipeDescription = async(recipeId:string, description:string):Promise<void>=>{
        try{
            await RecipeDatabase.connection(this.TABLE_NAME).update('description', description).where('id', recipeId)

        }catch (error: any) {
            throw new Error (error.message)
        }
    };


    public deleteRecipe = async(recipeId:string):Promise<void>=>{
        try{
            
            await RecipeDatabase.connection(this.TABLE_NAME).where('id',recipeId).del()

        }catch (error: any) {
            throw new Error (error.message)
        }
    };

    public deleteAllUserRecipes = async(userId:string):Promise<void>=>{
        try{
            
            await RecipeDatabase.connection(this.TABLE_NAME).where('author_id_fk',userId).del()

        }catch (error: any) {
            throw new Error (error.message)
        }
    };

   
}