import { BaseDatabase } from "./baseDatabase";
import { TABLE_FOLLOWS } from "./tableNames";
import { FollowClass } from "../model/class/followClass";
import { FollowRepository } from "../business/repository/followRepository";
import { CustomError } from "../error/customError";



export class FollowDatabase extends BaseDatabase implements FollowRepository {

    TABLE_NAME = TABLE_FOLLOWS

    public insertFollow = async (follow: FollowClass): Promise<void> => {
        try {

            await super.CreateItem(follow)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public followExists = async (input: FollowClass): Promise<any> => {
        try {

            const result = await FollowDatabase.connection.raw(`
                SELECT * FROM ${this.TABLE_NAME}
                WHERE user_follower_fk = "${input.getFlollowerId()}"
                AND user_followed_fk ="${input.getFlollowedId()}"
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };



    public deleteFollow = async (input: FollowClass): Promise<void> => {
        try {

            await FollowDatabase.connection.raw(`
                DELETE FROM ${this.TABLE_NAME}
                WHERE user_follower_fk = "${input.getFlollowerId()}"
                AND user_followed_fk ="${input.getFlollowedId()}"
            `)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getUserFollows = async (input:string ): Promise<any> => {

        try {
            const result = await FollowDatabase.connection.raw(`
                SELECT user_followed_fk AS "usuario" FROM ${this.TABLE_NAME}
                WHERE user_follower_fk = "${input}"
            `)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    
    public deleteAllUserFollows = async (userId:string): Promise<void> => {
        try {

            await FollowDatabase.connection.raw(`
                DELETE FROM ${this.TABLE_NAME}
                WHERE user_follower_fk = "${userId}" 
                OR user_followed_fk = "${userId}";           
            `)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}
