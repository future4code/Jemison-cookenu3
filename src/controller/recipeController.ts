import { RecipeBusiness } from './../business/recipeBusiness';
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs";
import * as dto from '../model/class/DTO/recipeDTOs'


export class RecipeController {

    constructor(private recipeBusiness: RecipeBusiness) { }

    createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {

            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const { title, description } = req.body
            const input = new dto.RecipeControllerInputDTO(
                title,
                description
            )

            const result = await this.recipeBusiness.createRecipe(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public getRecipeById = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const id = req.params.recipeId
            const recipeId = new dto.GetRecipeByIdInputDTO(id)

            const result = await this.recipeBusiness.getRecipeById(recipeId, tokenInput)

            res.status(200).send(result)

        } catch (error: any) {
            res.status(100).send(error.message)
        };

    }

}