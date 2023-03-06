import { CustomError } from "./customError";


export class InvalidUser extends CustomError{
    constructor(){
        super(404, 'ID do usuário não encontrado no banco de dados.')
    }
}
export class ProhibitedActionForThisRoleAccount extends CustomError{
    constructor(){
        super(403, 'Sem uma conta de Administrador, você só pode deletar sua própria conta.')
    }
}