import { FollowReturnForFeed } from './../model/class/DTO/followDTOs';

export class CreatStringForFeed {

    public createStringForFeed = (array:FollowReturnForFeed[] ): string => {

        let followsArray = []
        for (let i = 0; i < array.length; i++) {

            followsArray.push(`r.author_id_fk = "${array[i].usuario}" OR `)
        }
        let followsArrayToString = followsArray.toString()
        let followsStringWithoutComma = followsArrayToString.replace(/,/g, '')
        let followsStringWithoutFinalStrings = followsStringWithoutComma.slice(0, -3)

        return followsStringWithoutFinalStrings
    }
}