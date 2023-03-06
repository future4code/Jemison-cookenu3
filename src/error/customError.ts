export class CustomError extends Error {
    constructor(statusCode: number, message: string) {
        super(message)
    }
}

export class Unauthorized extends CustomError {
    constructor() {
        super(401, "Usuário não autorizado.")
    }
}
