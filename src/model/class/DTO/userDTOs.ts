import { UserClass } from './../userClass';
import { RoleEnum } from './../../roleENUM';

export class UserControllerInputDTO {
    constructor(
        private name: string,
        private email: string,
        private role: RoleEnum,
        private password: string
    ) { }

    public getName() {
        return this.name
    }
    public getEmail() {
        return this.email
    }
    public getRole() {
        return this.role
    }
    public getPassword() {
        return this.password
    }
}
export class CreationUserReturnDTO {
    constructor(
        private message: string,
        private user: UserClass,
        private token: string
    ) { }

    public getMessage() {
        return this.message
    }
    public getUser() {
        return this.user
    }
    public getToken() {
        return this.token
    }

}

export class GetUserProfileInputDTO {
    constructor(
        private userId: string,
    ) { }
    public getUserId() {
        return this.userId
    }

}

export interface ProfileReturnDTO {
    'ID de Usuário': string,
    'Nome': string,
    'Email': string,
    'Membro desde': string,
    'Tipo de conta': string
}