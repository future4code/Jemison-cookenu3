
export class ValidateEmail {

    public EmailValidator = (email: string) => {
        return /\S+@\S+\.\S+/.test(email)
    }
    
}
