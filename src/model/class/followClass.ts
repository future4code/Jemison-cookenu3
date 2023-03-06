
export class FollowClass {
    constructor(
        private user_follower_fk: string,
        private user_followed_fk: string,
    ) { }
    
    public getFlollowerId() {
        return this.user_follower_fk
    }
    public setFollowerId(newFollowerId: string) {
        this.user_follower_fk = newFollowerId
    }

    public getFlollowedId() {
        return this.user_followed_fk
    }
    public setFollowedId(newFollowedId: string) {
        this.user_followed_fk = newFollowedId
    }
}