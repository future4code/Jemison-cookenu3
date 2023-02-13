import { AuthenticationDataDTO, AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';
import { Unauthorized } from '../error/customError';
import * as jwt from 'jsonwebtoken'

export class Authenticator {

    public generateToken = (input: AuthenticationDataDTO): string => {

        const token = jwt.sign(
            {id: input.getId(), role: input.getRole() },
            process.env.JWT_KEY as string,
            { expiresIn: "24h" }
        )
        return token
    }

    getTokenData = (token: AuthenticationTokenDTO) => {
        try {
            const payload = jwt.verify(token.getToken(), process.env.JWT_KEY as string)as {id:string, role:string}
            return payload
        } catch (error: any) {
            console.log(error.message)
            throw new Unauthorized()
        }
    }

}