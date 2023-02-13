import { CustomError } from './customError'

export class MissingName extends CustomError {
    constructor() {
        super(422, 'Nome do novo usuário faltando')
    }
}

export class MissingEmail extends CustomError {
    constructor() {
        super(422, 'Email do novo usuário faltando')
    }
}

export class MissingPassword extends CustomError {
    constructor() {
        super(422, 'Senha do novo usuário faltando')
    }
}

export class InvalidEmail extends CustomError {
    constructor() {
        super(422, 'Email no formato inválido, o email precisa ter o formato "nome@email.com".')
    }
}

export class InvalidPassword extends CustomError {
    constructor() {
        super(422, 'Senha Inválida, a senha deve possuir no mínimo 8 caracteres contendo ao menos um números, uma letra maíuscula, uma letra minúsculas e um caracter especial(!@#$%&).')
    }
}

export class InvalidRole extends CustomError {
    constructor() {
        super(422, 'O tipo de conta do usuário, precisa ser "admin" ou "normal", caso não for passado nenhum parâmetro, a "Role" será adicionada como "normal".')
    }
}

export class EmailAlreadyExists extends CustomError {
    constructor() {
        super(409, 'Email já existente no banco de dados')
    }
}

export class WrongEmail extends CustomError {
    constructor() {
        super(404, "Email não cadastrado em nosso sistema.")
    }
}

export class WrongPassword extends CustomError {
    constructor() {
        super(404, 'Password inserido não combina com a conta do email digitado.')
    }
}

export class InvalidUser extends CustomError{
    constructor(){
        super(404, 'ID do usuário não encontrado no banco de dados.')
    }
}

export class UserIdEqualYourOwnId extends CustomError {
    constructor() {
        super(422, 'ID do usuário informado, igual ao ID do usuário autenticado pelo token. Para verificar seu próprio perfil, utilize outro endpoint.')
    }
}