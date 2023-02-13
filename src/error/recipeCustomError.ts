import { CustomError } from './customError'

export class MissingTitle extends CustomError {
    constructor() {
        super(422, 'Título da receita faltando.')
    }
}

export class MissingDescription extends CustomError {
    constructor() {
        super(422, 'Modo de preparo da receita faltando.')
    }
}

export class RecipeTitleAlreadyExists extends CustomError {
    constructor() {
        super(409, 'Já existe uma receita com este título.')
    }
}