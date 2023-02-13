import express from "express";
import { RecipeController } from "../controller/recipeController";

export const recipeRouter = express.Router()

const recipeController = new RecipeController()

recipeRouter.post("/create", recipeController.createRecipe)


