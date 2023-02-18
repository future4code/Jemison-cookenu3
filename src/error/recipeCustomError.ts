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


export class MissingRecipeId extends CustomError {
    constructor() {
        super(422, 'Falta o ID da receita.')
    }
}

export class RecipeIdNonExists extends CustomError{
    constructor(){
        super(404, 'ID da receita não encontrada no banco de dados.')
    }
}

export class FollowsEmpty extends CustomError{
    constructor(){
        super(404, 'Você não está seguindo nenhum usuário')
    }
}

export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Sem uma conta de Administrador, você só pode alterar ou deletar receitas que você mesmo criou.')
    }
}

export class MissingTitleAndDescription extends CustomError {
    constructor() {
        super(422, 'Para atualizar uma receita você precisa de um título e/ou uma descrição.')
    }
}

