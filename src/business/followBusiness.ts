import { FollowClass } from './../model/class/followClass';
import { UserRepository } from './repository/userRepository';
import { FollowRepository } from "./repository/followRepository"
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs"
import { CustomError } from "../error/customError";
import * as err from '../error/followCustomError';
import * as dto from '../model/class/DTO/followDTOs';
import { Authenticator } from "../services/authenticator";


export class FollowBusiness {

    constructor(
        private followDatabase: FollowRepository,
        private userDatabase: UserRepository
    ) { }


    public followUser = async (input: dto.FollowUserInputDTO, inputToken: AuthenticationTokenDTO): Promise<dto.CreateFollowUserReturnDTO> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(inputToken)

            if (!input.getUserId()) {
                throw new err.MissingUserId()
            }

            if (input.getUserId() === id) {
                throw new err.UserIdEqualYourOwnId()
            }

            const userExists = await this.userDatabase.getUserById(input.getUserId())

            if (userExists.length === 0) {
                throw new err.InvalidUser()
            } else {

                const newFollow = new FollowClass(
                    id,
                    input.getUserId()
                )

                const followsExist = await this.followDatabase.followExists(newFollow)

                if (followsExist.length > 0) {
                    throw new err.UserAlreadyFollowed()

                } else {

                    await this.followDatabase.insertFollow(newFollow)

                    const result = new dto.CreateFollowUserReturnDTO(
                        'Usuário seguido com sucesso.',
                        newFollow
                    )

                    return result
                }
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public unfollowUser = async (input: dto.FollowUserInputDTO, inputToken: AuthenticationTokenDTO): Promise<string> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(inputToken)

            if (!input.getUserId()) {
                throw new err.MissingUserId()
            }

            if (input.getUserId() === id) {
                throw new err.UserIdEqualYourOwnId()
            }

            const userExists = await this.userDatabase.getUserById(input.getUserId())

            if (userExists.length === 0) {
                throw new err.InvalidUser()
            }

            const newFollow = new FollowClass(
                id,
                input.getUserId()
            )

            const followsExist = await this.followDatabase.followExists(newFollow)

            if (followsExist.length === 0) {
                throw new err.InvalidFollow()
            } else {

                await this.followDatabase.deleteFollow(newFollow)

                return 'Você deixou de seguir o usuário.'
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}
