import { UserClass } from "../../model/class/userClass"

export interface UserRepository{

    insertUser(user: UserClass):Promise<void>
    emailExists(email:string):Promise<any>
    getUserById(id: string): Promise<any>
}