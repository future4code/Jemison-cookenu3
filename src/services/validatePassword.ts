
export class ValidatePassword {

public PasswordValidator = (password: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?$*&@#])[0-9a-zA-Z$*!?&@#]{8,}$/.test(password)
}

}