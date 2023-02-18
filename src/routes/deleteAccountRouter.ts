import { DeleteUserController } from './../controller/deleteAccountController';
import { DeleteAccountBusiness } from './../business/deleteAccountBusiness';
import { FollowDatabase } from './../data/followDatabase';
import { RecipeDatabase } from './../data/recipeDatabase';
import { UserDatabase } from './../data/userDatabase';
import express  from "express"


export const deleteAccountRouter = express.Router()

const userDatabase = new UserDatabase()
const recipeDatabase = new RecipeDatabase()
const followDatabase = new FollowDatabase()
const deleteAccountBusiness = new DeleteAccountBusiness(userDatabase, recipeDatabase, followDatabase)
const deleteAccountController = new DeleteUserController(deleteAccountBusiness)

deleteAccountRouter.delete('/delete/:userId',deleteAccountController.deleteAccount)