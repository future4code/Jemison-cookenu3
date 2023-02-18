import { RoleEnum } from '../model/roleENUM';
import { DeleteUserIdInputDTO } from '../model/class/DTO/userDeleteDTOs';
import { UserRepository } from './repository/userRepository';
import { RecipeRepository } from './repository/recipeRepository';
import { FollowRepository } from './repository/followRepository';
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { Authenticator } from '../services/authenticator';
import { CustomError } from '../error/customError';
import * as err from '../error/deleteUserError';

export class DeleteAccountBusiness {

    constructor(
        private userDatabase: UserRepository,
        private recipeDatabase: RecipeRepository,
        private followDatabase: FollowRepository
    ) { }

    public deleteAccount = async (input: DeleteUserIdInputDTO, token: AuthenticationTokenDTO): Promise<string> => {
        try {

            const authenticator = new Authenticator()
            const { id, role } = authenticator.getTokenData(token)

            const userExists = await this.userDatabase.getUserByIdWithoutAlias(input.getUserId())

            if (!userExists) {
                throw new err.InvalidUser()
            } else {
                if (role === RoleEnum.ADMIN) {
                    await this.followDatabase.deleteAllUserFollows(input.getUserId())
                    await this.recipeDatabase.deleteAllUserRecipes(input.getUserId())
                    await this.userDatabase.deleteUser(input.getUserId())

                    return `Administrador deletou a conta de ${userExists.name}, ID:${userExists.id}`
              
                } else if (role === RoleEnum.NORMAL)
                    if (id !== userExists.id) {
                        throw new err.ProhibitedActionForThisRoleAccount()
                    } 
                  
                    if (id === userExists.id) {
                        await this.followDatabase.deleteAllUserFollows(input.getUserId())
                        await this.recipeDatabase.deleteAllUserRecipes(input.getUserId())
                        await this.userDatabase.deleteUser(input.getUserId())

                        return `Usuário ${userExists.name}, ID:${userExists.id}, deletou sua conta.`
                    }
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };


};


