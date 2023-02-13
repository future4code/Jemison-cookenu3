import { RecipeBusiness } from './../business/recipeBusiness';
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs";
import * as dto from '../model/class/DTO/recipeDTOs'


export class RecipeController {

    constructor(private recipeBusiness: RecipeBusiness) { }

    createRecipe = async (req: Request, res: Response):Promise<void> => {
        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { title, description } = req.body
            const input = new dto.RecipeControllerInputDTO(
                title,
                description
            )

            const result = await this.recipeBusiness.createRecipe(input,tokenInput )

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };
 }

    getById = async (req: Request, res: Response) => {
        try {
            const token = req.headers.auth as string
            const input = new AuthenticationTokenDTO(token)

            const id = req.params.userId

            const result: any = await this.recipeBusiness.getById(input, id)

            let message = "Sucess"

            if(!result[0]) {
                res.statusCode = 404
                message = "Post not found"
                throw new Error (message)
            }

            const post: any = {
                "id": result[0].id,
	            "title": result[0].title,
	            "description": result[0].description,
	            "createdAt": result[0].created_at
            }
            res.status(200).send({message, post, result})

        } catch (error: any) {
            res.status(100).send(error.message)
        }
    }

}