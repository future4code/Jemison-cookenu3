import { UserClass } from "../../model/class/userClass"

export interface UserRepository {

    insertUser(user: UserClass): Promise<void>
    emailExists(email: string): Promise<any>
    getUserById(id: string): Promise<any>
    getUserByIdWithoutAlias(userId: string): Promise<any>
    deleteUser(userId:string):Promise<void>
    updateUserPassword(newPassword: string, userId:string):Promise<void>
}