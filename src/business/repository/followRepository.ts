import { FollowDTO } from './../../model/class/DTO/followDTOs';
import { FollowClass } from "../../model/class/followClass"


export interface FollowRepository {

    insertFollow(follow: FollowClass): Promise<void>
    deleteFollow(input: FollowClass): Promise<void>
    followExists(input: FollowClass):Promise<any>
}