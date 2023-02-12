import { BaseDatabase } from "./baseDatabase";
import { UserRepository } from "../business/repository/userRepository";
import { TABLE_USERS } from "./tableNames";
import { UserClass } from "../model/class/userClass";
import { CustomError } from "../error/customError";

export class UserDatabase extends BaseDatabase implements UserRepository {

    TABLE_NAME = TABLE_USERS

    public insertUser = async (user: UserClass): Promise<void> => {
        try {

            await super.CreateItem(user)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public emailExists = async (email: string): Promise<any> => {
        try {

            const result = await UserDatabase.connection(this.TABLE_NAME).where('email', email)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getUserById = async (id: string): Promise<any> => {
        try {

            const result = await UserDatabase.connection.raw(`
                SELECT id AS "ID de Usuário", name AS "Nome", email AS "Email",
                DATE_FORMAT(STR_TO_DATE(member_since, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "Membro desde",
                role AS "Tipo de conta"
                FROM ${this.TABLE_NAME}
                WHERE id = "${id}";            
            `)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}