
import { RecipeClass } from './../model/class/recipeClass';
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { RecipeRepository } from './repository/rescieRepository';
import { Authenticator } from '../services/authenticator';
import { IdGenerator } from '../services/idGenerator';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/recipeDTOs';
import * as err from '../error/recipeCustomError';

export class RecipeBusiness {

    constructor(private recipeDatabase: RecipeRepository) { }

    createRecipe = async (input: dto.RecipeControllerInputDTO, token: AuthenticationTokenDTO):Promise<dto.CreationRecipeReturnDTO> => {
        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)


            if (!input.getTitle()) {
                throw new err.MissingTitle()
            }

            if(!input.getDescription()){
                throw new err.MissingDescription()
            }

            const recipeNameExists = await this.recipeDatabase.getRecipeByName(input.getTitle())
            if(recipeNameExists){
                throw new err.RecipeTitleAlreadyExists()
            }else{

            const idGenerator = new IdGenerator()
            const recipeId = idGenerator.generateId()

            const newRecipe = new RecipeClass(
                recipeId,
                input.getTitle(),
                input.getDescription(),
                id
            )
            await this.recipeDatabase.insertRecipe(newRecipe)

           const result = new dto.CreationRecipeReturnDTO(
            'Receita Criada com sucesso!',
            newRecipe
           ) 
            
            return result
           
        }
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