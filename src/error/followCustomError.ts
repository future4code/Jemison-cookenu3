import { CustomError } from "./customError";

export class MissingUserId extends CustomError {
    constructor() {
        super(422, 'ID do usuário que quer seguir, faltando.')
    }
}

export class UserIdEqualYourOwnId extends CustomError {
    constructor() {
        super(422, 'ID do usuário informado, igual ao ID do usuário autenticado pelo token.')
    }
}

export class InvalidUser extends CustomError{
    constructor(){
        super(404, 'ID do usuário não encontrado no banco de dados.')
    }
}

export class UserAlreadyFollowed extends CustomError{
    constructor(){
        super(404, 'Você já segue este usuário.')
    }
}
export class InvalidFollow extends CustomError{
    constructor(){
        super(404, 'Não é possível deixar de seguir um usuário que você não segue.')
    }
}

