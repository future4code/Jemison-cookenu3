import { UserController } from './../controller/userController';
import { UserDatabase } from './../data/userDatabase';
import { UserBusiness } from './../business/userBusiness';
import express from 'express'


export const userRouter = express.Router()

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.post('/create', userController.creatUser)

userRouter.get('/profile', userController.getSelfProfile)

userRouter.get('/profile/:userId', userController.getUserProfile)