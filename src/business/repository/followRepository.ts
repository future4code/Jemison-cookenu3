import { FollowClass } from "../../model/class/followClass"


export interface FollowRepository {

    insertFollow(follow: FollowClass): Promise<void>
    deleteFollow(input: FollowClass): Promise<void>
    followExists(input: FollowClass):Promise<any>
    getUserFollows(input:string ): Promise<any>
    deleteAllUserFollows(userId:string): Promise<void>
}