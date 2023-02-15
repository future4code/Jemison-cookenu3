import { RecipeBusiness } from './../business/recipeBusiness';
import { RecipeDatabase } from './../data/recipeDatabase';
import express from "express";
import { RecipeController } from "../controller/recipeController";

export const recipeRouter = express.Router()

const recipeDatabase = new RecipeDatabase()
const recipeBusiness = new RecipeBusiness(recipeDatabase)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.post("/create", recipeController.createRecipe)

recipeRouter.get('/:recipeId', recipeController.getRecipeById)


