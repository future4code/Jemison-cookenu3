import { Request, Response } from "express";
import { RecipeBusiness } from "../business/recipeBusiness";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTO";


export class RecipeController {
    private recipeBusiness = new RecipeBusiness();

    createRecipe = async (req: Request, res: Response) => {
        try {

            const token = req.headers.auth as string
            const input = new AuthenticationTokenDTO(token)

            const create: any = {
                title: req.body.tittle,
                description: req.body.description
            }

            await this.recipeBusiness.createRecipe(create, input)

            res.status(201).send({message: "Post criado"})

        } catch (error: any) {
            res.status(400).send(error.message)
        }
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