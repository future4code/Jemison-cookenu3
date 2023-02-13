import { RecipeDatabase } from "../data/recipeDatabase";
import { CustomError } from "../error/customError";
import { Authenticator } from "../services/authenticator";
import { IdGenerator } from "../services/idGenerator";
import * as dto from "../model/class/DTO/authenticationsDTO"
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTO";

export class RecipeBusiness {
    private recipeDatabase = new RecipeDatabase();

    createRecipe = async (userId: dto.AuthenticationTokenDTO, input: any) => {
        try {

            const autheticator = new Authenticator()
            autheticator.getTokenData(userId)

            const { title, description } = input

            if (!title || !description) {
                throw new CustomError(400, "Preencha o título e a descrição da receita")
            }

            const id = new IdGenerator()

            await this.recipeDatabase.insertRecipes({
                id,
                title,
                description,
                created_at: new Date()
            })
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    getById = async (id: string, input: AuthenticationTokenDTO) => {
        try {

            const authenticator = new Authenticator()
            authenticator.getTokenData(input)

            return await this.recipeDatabase.getById(id)
            
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }
}