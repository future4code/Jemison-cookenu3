import { RoleEnum } from './../model/roleENUM';
import { CreatStringForFeed } from './../services/createStringForFeed';
import { FollowUserInputDTO } from './../model/class/DTO/followDTOs';
import { FollowRepository } from './repository/followRepository';
import { RecipeClass } from './../model/class/recipeClass';
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { RecipeRepository } from './repository/recipeRepository';
import { Authenticator } from '../services/authenticator';
import { IdGenerator } from '../services/idGenerator';
import { CustomError } from '../error/customError';
import * as dto from '../model/class/DTO/recipeDTOs';
import * as err from '../error/recipeCustomError';

export class RecipeBusiness {

    constructor(
        private recipeDatabase: RecipeRepository,
        private followDatabase: FollowRepository
    ) { }

    public createRecipe = async (input: dto.RecipeControllerInputDTO, token: AuthenticationTokenDTO): Promise<dto.CreationRecipeReturnDTO> => {
        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.getTitle()) {
                throw new err.MissingTitle()
            }

            if (!input.getDescription()) {
                throw new err.MissingDescription()
            }

            const recipeNameExists = await this.recipeDatabase.getRecipeByName(input.getTitle())
            if (recipeNameExists) {
                throw new err.RecipeTitleAlreadyExists()
            } else {

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
    };

    public getRecipeById = async (recipeId: dto.GetRecipeByIdInputDTO, token: AuthenticationTokenDTO): Promise<dto.CreationRecipeReturnDTO> => {
        try {
            const authenticator = new Authenticator()
            authenticator.getTokenData(token)

            if (recipeId.getRecipeId() == ':recipeId' || !recipeId.getRecipeId()) {
                throw new err.MissingRecipeId()
            }

            const result = await this.recipeDatabase.getRecipeById(recipeId.getRecipeId())

            if (result.length === 0) {
                throw new err.RecipeIdNonExists()
            } else {
                return result
            }

        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };

    public getUserFeed = async (token: AuthenticationTokenDTO): Promise<dto.CreationRecipeReturnDTO[]> => {
        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            const userFollowsArray = await this.followDatabase.getUserFollows(id)

            const createStringForFeed = new CreatStringForFeed()
            const stringForFeed = createStringForFeed.createStringForFeed(userFollowsArray)

            if (userFollowsArray.length === 0) {
                throw new err.FollowsEmpty()
            } else {

                const result = await this.recipeDatabase.getUserFeed(stringForFeed)

                return result
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public updateRecipe = async (input: dto.UpdateRecipeInputDTO, token: AuthenticationTokenDTO): Promise<string> => {
        try {

            const authenticator = new Authenticator()
            const { id, role } = authenticator.getTokenData(token)

            if (input.getTitle()) {
                const nameRecipeExists = await this.recipeDatabase.getRecipeByName(input.getTitle())
                if (nameRecipeExists) {
                    throw new err.RecipeTitleAlreadyExists()
                }
            }

            const recipeExists = await this.recipeDatabase.getRecipeByIdWithoutAlias(input.getRecipeId())
            if (!recipeExists) {
                throw new err.RecipeIdNonExists()
            }

            if (input.getTitle() && !input.getDescription()) {
                if (role === RoleEnum.ADMIN) {
                    await this.recipeDatabase.updateRecipeTitle(id, input.getTitle())
                    return `Administrador Atualizou o nome da receita "${recipeExists.title}" para "${input.getTitle()}"`
                } else if (role === RoleEnum.NORMAL) {
                    if (id === recipeExists.author_id_fk) {
                        await this.recipeDatabase.updateRecipeTitle(id, input.getTitle())
                        return `Usuário Atualizou o nome de sua receita "${recipeExists.title}" para "${input.getTitle()}"`
                    } else if (id !== recipeExists.author_id_fk) {
                        throw new err.ProhibitedActionForThisRoleAccount()
                    }
                }
            }

            if (!input.getTitle() && input.getDescription()) {
                if (role === RoleEnum.ADMIN) {
                    await this.recipeDatabase.updateRecipeDescription(id, input.getDescription())
                    return `Administrador Atualizou o modo de preparo da receita "${recipeExists.description}" para "${input.getDescription()}"`
                } else if (role === RoleEnum.NORMAL) {
                    if (id === recipeExists.author_id_fk) {
                        await this.recipeDatabase.updateRecipeDescription(id, input.getDescription())
                        return `Usuário Atualizou o modo de preparo de sua receita "${recipeExists.description}" para "${input.getDescription()}"`
                    } else if (id !== recipeExists.author_id_fk) {
                        throw new err.ProhibitedActionForThisRoleAccount()
                    }
                }
            }

            if (input.getTitle() && input.getDescription()) {
                if (role === RoleEnum.ADMIN) {
                    await this.recipeDatabase.updateRecipeTitle(id, input.getTitle())
                    await this.recipeDatabase.updateRecipeDescription(id, input.getDescription())
                    return `Administrador Atualizou o nome da receita "${recipeExists.title}" para "${input.getTitle()}" e modo de preparo de "${recipeExists.description}" para "${input.getDescription()}"`
                } else if (role === RoleEnum.NORMAL) {
                    if (id === recipeExists.author_id_fk) {
                        await this.recipeDatabase.updateRecipeTitle(id, input.getTitle())
                        await this.recipeDatabase.updateRecipeDescription(id, input.getDescription())
                        return `Usuário Atualizou o nome de sua receita "${recipeExists.title}" para "${input.getTitle()}" e modo de preparo de "${recipeExists.description}" para "${input.getDescription()}"`
                    } else if (id !== recipeExists.author_id_fk) {
                        throw new err.ProhibitedActionForThisRoleAccount()
                    }
                }
            }
            if (!input.getTitle() && !input.getDescription()) {
                throw new err.MissingTitleAndDescription()
            }


        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public deleteRecipe = async (input: dto.GetRecipeByIdInputDTO, token: AuthenticationTokenDTO): Promise<string> => {
        try {

            const authenticator = new Authenticator()
            const { id, role } = authenticator.getTokenData(token)

            const recipeExists = await this.recipeDatabase.getRecipeByIdWithoutAlias(input.getRecipeId())
            if (!recipeExists) {
                throw new err.RecipeIdNonExists()
            } else {
                if (role === RoleEnum.ADMIN) {
                    await this.recipeDatabase.deleteRecipe(input.getRecipeId())
                    return `Administrador Deletou a receita ${recipeExists.title}.`
                } else if (role === RoleEnum.NORMAL) {
                    if (id === recipeExists.author_id_fk) {
                        await this.recipeDatabase.deleteRecipe(input.getRecipeId())
                        return `Usuário deletou sua receita "${recipeExists.title}".`
                    } else if (id !== recipeExists.author_id_fk) {
                        throw new err.ProhibitedActionForThisRoleAccount()
                    }
                }
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}