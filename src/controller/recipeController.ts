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
}