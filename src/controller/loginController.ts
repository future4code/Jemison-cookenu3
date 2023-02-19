import { LoginBusiness } from '../business/loginBusiness';
import { Request, Response } from 'express';
import * as dto from "../model/class/DTO/loginDTOs";

export class LoginController {
  constructor(private loginBusiness: LoginBusiness) { }

  public login = async (req: Request, res: Response): Promise<void> => {

    try {

      const { email, password } = req.body

      const input = new dto.LoginInputDTO(
        email,
        password
      )

      const result = await this.loginBusiness.login(input)
      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };


  public forgotPassword = async (req: Request, res: Response): Promise<void> => {

    try {

      const { email } = req.body 
      const input = new dto.ForgotPassowrInputDTO(email)

      const result = await this.loginBusiness.forgotPassword(input)
      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}