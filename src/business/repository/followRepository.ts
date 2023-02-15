import { FollowClass } from "../../model/class/followClass"


export interface FollowRepository{

    insertRecipe(follow:FollowClass ): Promise<void>

}