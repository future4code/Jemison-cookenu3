import { FollowDatabase } from './../data/followDatabase';
import { RecipeBusiness } from './../business/recipeBusiness';
import { RecipeDatabase } from './../data/recipeDatabase';
import express from "express";
import { RecipeController } from "../controller/recipeController";

export const recipeRouter = express.Router()

const recipeDatabase = new RecipeDatabase()
const followDatabase = new FollowDatabase()
const recipeBusiness = new RecipeBusiness(recipeDatabase, followDatabase)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.get('/userFeed', recipeController.getUserFeed)

recipeRouter.get('/:recipeId', recipeController.getRecipeById)

recipeRouter.put('/update/:recipeId', recipeController.updateRecipe)

recipeRouter.delete('/delete/:recipeId', recipeController.deleteRecipe)

recipeRouter.post('/create', recipeController.createRecipe)

