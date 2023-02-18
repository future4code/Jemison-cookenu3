import { RecipeIdNonExists } from './../error/recipeCustomError';
import { RecipeBusiness } from './../business/recipeBusiness';
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from "../model/class/DTO/authenticationsDTOs";
import * as dto from '../model/class/DTO/recipeDTOs'


export class RecipeController {

    constructor(private recipeBusiness: RecipeBusiness) { }

    public createRecipe = async (req: Request, res: Response): Promise<void> => {
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

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public getUserFeed = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const result = await this.recipeBusiness.getUserFeed(tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public updateRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const recipeId = req.params.recipeId 
            const { title, description } = req.body

            const input = new dto.UpdateRecipeInputDTO(
             recipeId,
             title,
             description
            )

            const result = await this.recipeBusiness.updateRecipe(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };

    public deleteRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.auth as string
            const tokenInput = new AuthenticationTokenDTO(token)

            const recipeId = req.params.recipeId 
            
            const input = new dto.GetRecipeByIdInputDTO(
             recipeId,
            )

            const result = await this.recipeBusiness.deleteRecipe(input, tokenInput)

            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message)
        }

    };


}