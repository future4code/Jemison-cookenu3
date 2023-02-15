import { BaseDatabase } from "./baseDatabase";
import { TABLE_FOLLOWS } from "./tableNames";
import { FollowClass } from "../model/class/followClass";
import { FollowRepository } from "../business/repository/followRepository";
import { CustomError } from "../error/customError";

export class FollowsDatabase extends BaseDatabase implements FollowRepository {

    TABLE_NAME = TABLE_FOLLOWS

    public insertRecipe = async (follow:FollowClass ): Promise<void> => {
        try {

            await super.CreateItem(follow)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}
