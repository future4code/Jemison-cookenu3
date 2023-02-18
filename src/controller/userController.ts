import { UserDatabase } from './../data/userDatabase';
import { UserBusiness } from '../business/userBusiness';
import { Request, Response } from 'express';
import * as dto from '../model/class/DTO/userDTOs';
import { AuthenticationTokenDTO } from '../model/class/DTO/authenticationsDTOs';


export class UserController {
  constructor(private userBusiness: UserBusiness) { }

  public creatUser = async (req: Request, res: Response): Promise<void> => {
    try {

      const { name, email, role, password } = req.body

      const input = new dto.UserControllerInputDTO(
        name,
        email,
        role,
        password
      )

      const result = await this.userBusiness.createUser(input)
      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };



  public getSelfProfile = async (req: Request, res: Response): Promise<void> => {

    try {

      const token = req.headers.auth as string
      const input = new AuthenticationTokenDTO(token)


      const result = await this.userBusiness.getSelfProfile(input)
      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
  

  public getUserProfile = async (req: Request, res: Response): Promise<void> => {

    try {

      const token = req.headers.auth as string
      const input = new AuthenticationTokenDTO(token)

      const id = req.params.userId
      const userId = new dto.GetUserProfileInputDTO(id)


      const result = await this.userBusiness.getUserProfile(userId, input)
      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
