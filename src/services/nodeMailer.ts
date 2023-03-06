import nodemailer from "nodemailer";
import { CustomError } from "../error/customError";

export class NodeMailer {

    private transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
    });


    public sendEmail = async (email: string, password: string):Promise<any> => {
        try {
            this.transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: [email],
                subject: "Jemison-Cookenu3 - Recuperação de senha ",
                text:
                `O correto para este endpoint ser funcional, seria o usuário receber apenas o link com o endpoint que altera a senha sem precisar de um autenticador.
               
    Desta forma o usuário, ao entrar em seu email, com sua senha serviria como autenticador, provando que a conta de email é realmente dele.
               
    Da forma que está atualmente, é possível qualquer usuário trocar a senha de qualquer outro usuário, apenas sabendo o email que ele tem cadastrado no projeto. 
               
    Porém para ser possível testar este endpoint, a senha foi alterada automaticamente.
                
    Sua nova senha a partir de agora é: ${password}` ,
            });
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}