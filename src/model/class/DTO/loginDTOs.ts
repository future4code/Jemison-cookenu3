

export class LoginInputDTO {
    constructor(
        private email: string,
        private password: string
    ) { }
    public getEmail() {
        return this.email
    }
    public getPassword() {
        return this.password
    }
}

export class ForgotPassowrInputDTO{
    constructor(
        private email: string
    ){}
    public getEmail(){
        return this.email
    }
}