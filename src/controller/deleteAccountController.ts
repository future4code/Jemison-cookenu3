import { DeleteUserIdInputDTO } from '../model/class/DTO/userDeleteDTOs';
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs";
import { DeleteAccountBusiness } from '../business/deleteAccountBusiness';

export class DeleteUserController {
    constructor(private deleteAccountBusiness: DeleteAccountBusiness) { }

    public deleteAccount = async (req: Request, res: Response): Promise<void> => {
        try {
  
          const token = req.headers.auth as string
          const inputToken = new AuthenticationTokenDTO(token)
    
          const { userId } = req.params
    
          const input = new DeleteUserIdInputDTO(
              userId
          )
       
              
          const result = await this.deleteAccountBusiness.deleteAccount(input, inputToken)
          res.status(201).send(result)
    
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };
}