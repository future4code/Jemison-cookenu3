import { RoleEnum } from "../../roleENUM"

export class AuthenticationDataDTO {
    constructor (
        private id:string,
        private role:RoleEnum
        ){}

public getId(){
    return this.id
}
public getRole(){
    return this.role
}
}

export class AuthenticationTokenDTO {
    constructor(
    private token: string){}

    public getToken(){
        return this.token
    }
}