import { FollowClass } from './../followClass';

export class FollowUserInputDTO {
    constructor(
        private userId: string
    ) { }

    public getUserId() {
        return this.userId
    }

}

export class CreateFollowUserReturnDTO {
    constructor(
        private message: string,
        private follow: FollowClass
    ) { }

}

export class FollowDTO{
    constructor(
        public followerId: string,
        public followedId: string,
    ) { }
    
}

export class FollowReturnForFeed{
    constructor(
        public usuario:string
    ){}
}
