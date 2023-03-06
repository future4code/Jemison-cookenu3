

export class DeleteUserIdInputDTO {
    constructor(
        private userId: string
    ) { }

    public getUserId() {
        return this.userId
    }
}