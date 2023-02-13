import { RoleEnum } from './../model/roleENUM';
import { AuthenticationDataDTO, AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { ValidatePassword } from './../services/validatePassword';
import { ValidateEmail } from './../services/validatedEmail';
import { UserRepository } from "./repository/userRepository";
import * as dto from "../model/class/DTO/userDTOs";
import { IdGenerator } from '../services/idGenerator';
import { HashManager } from '../services/hashManager';
import { Authenticator } from '../services/authenticator';
import { UserClass } from '../model/class/userClass';
import { CustomError } from '../error/customError';
import * as err from '../error/userCustomError'

export class UserBusiness {

    constructor(private userDatabase: UserRepository) { }

    public createUser = async (input: dto.UserControllerInputDTO): Promise<dto.CreationUserReturnDTO> => {

        try {

            let filteredRole

            if (!input.getName()) {
                throw new err.MissingName()
            }
            if (!input.getEmail()) {
                throw new err.MissingEmail()
            }
            if (!input.getPassword()) {
                throw new err.MissingPassword()
            }
            if (!input.getRole()) {
                filteredRole = RoleEnum.NORMAL
            } else if (input.getRole().toString().toLowerCase() === 'normal') {
                filteredRole = RoleEnum.NORMAL
            } else if (input.getRole().toString().toLowerCase() === 'admin') {
                filteredRole = RoleEnum.ADMIN
            } else {
                throw new err.InvalidRole()
            }

            const validateEmail = new ValidateEmail()
            const isEmailValid = validateEmail.EmailValidator(input.getEmail())

            if (!isEmailValid) {
                throw new err.InvalidEmail()
            }

            const validatePassword = new ValidatePassword()
            const isPasswordValid = validatePassword.PasswordValidator(input.getPassword())
            if (!isPasswordValid) {
                throw new err.InvalidPassword()
            }

            const emailExists = await this.userDatabase.emailExists(input.getEmail())

            if (emailExists !== undefined) {
                throw new err.EmailAlreadyExists()
            } else {
                const idGenerator = new IdGenerator()
                const hashManager = new HashManager()

                const authenticator = new Authenticator()

                const id: string = idGenerator.generateId()
                const hashPassord: string = await hashManager.generateHash(input.getPassword())

                const newUser = new UserClass(
                    id,
                    input.getName(),
                    input.getEmail(),
                    filteredRole,
                    hashPassord
                )
                await this.userDatabase.insertUser(newUser)

                const tokenInput = new AuthenticationDataDTO(
                    id,
                    input.getRole()
                )
                const token = authenticator.generateToken(tokenInput)

                const result = new dto.CreationUserReturnDTO(
                    'Usuário criado com sucesso',
                    newUser,
                    token
                )
                return result
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };




    public getSelfProfile = async (input: AuthenticationTokenDTO): Promise<dto.CreationUserReturnDTO> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(input)

            return await this.userDatabase.getUserById(id)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };





    public getUserProfile = async (userId: dto.GetUserProfileInputDTO, input: AuthenticationTokenDTO): Promise<dto.CreationUserReturnDTO> => {

        try {

            const authenticator = new Authenticator()
           const {id} = authenticator.getTokenData(input)

            if(userId.getUserId() === id ){
                throw new err.UserIdEqualYourOwnId()
            }

            const result = await this.userDatabase.getUserById(userId.getUserId())

            if(result.length === 0){
                throw new err.InvalidUser()
            }else{
                return result
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}
