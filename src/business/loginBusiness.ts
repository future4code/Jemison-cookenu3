import { AuthenticationDataDTO, AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { UserRepository } from "./repository/userRepository";
import * as dto from "../model/class/DTO/userDTOs";
import { HashManager } from '../services/hashManager';
import { Authenticator } from '../services/authenticator';
import { CustomError } from '../error/customError';
import * as err from '../error/userCustomError'

export class LoginBusiness {

    constructor(private userDatabase: UserRepository) { }


    public login = async (input: dto.LoginInputDTO): Promise<AuthenticationTokenDTO> => {

        try {

            const emailExists = await this.userDatabase.emailExists(input.getEmail())

            if (!emailExists) {
                throw new err.WrongEmail()
            }

            const hashManager = new HashManager()

            const comparePassword: boolean = await hashManager.compareHash(input.getPassword(), emailExists.password)
            if (!comparePassword) {
                throw new err.WrongPassword()
            } else {

                const authenticator = new Authenticator()
                const input = new AuthenticationDataDTO(
                    emailExists.id,
                    emailExists.role
                )

                const token = authenticator.generateToken(input)
                const authenticationTokenDTO = new AuthenticationTokenDTO(token)

                return authenticationTokenDTO
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}

    