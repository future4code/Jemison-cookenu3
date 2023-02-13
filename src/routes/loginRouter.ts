import { LoginController } from './../controller/loginController';
import { UserDatabase } from './../data/userDatabase';
import express from 'express'
import { LoginBusiness } from '../business/loginBusiness';


export const loginRouter = express.Router()

const userDatabase = new UserDatabase()
const loginBusiness = new LoginBusiness(userDatabase)
const loginController = new LoginController(loginBusiness)

loginRouter.post('/login', loginController.login)