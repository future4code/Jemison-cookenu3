import { Request, Response } from "express";
import { FollowBusiness } from "../business/followBusiness";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs";
import * as dto from '../model/class/DTO/followDTOs'

export class FollowController {
    constructor(private followBusiness: FollowBusiness) { }
  
    public followUser = async (req: Request, res: Response): Promise<void> => {
      try {

        const token = req.headers.auth as string
        const inputToken = new AuthenticationTokenDTO(token)
  
        const { userId } = req.body
  
        const input = new dto.FollowUserInputDTO(
            userId
        )
  
        const result = await this.followBusiness.followUser(input, inputToken)
        res.status(201).send(result)
  
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    };

    public unfollowUser = async (req: Request, res: Response): Promise<void> => {
        try {
  
          const token = req.headers.auth as string
          const inputToken = new AuthenticationTokenDTO(token)
    
          const { userId } = req.body
    
          const input = new dto.FollowUserInputDTO(
              userId
          )
    
          const result = await this.followBusiness.unfollowUser(input, inputToken)
          res.status(201).send(result)
    
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };
  

}