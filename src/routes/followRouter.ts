import { FollowController } from './../controller/followController';
import { FollowBusiness } from './../business/followBusiness';
import { UserDatabase } from './../data/userDatabase';
import { FollowDatabase } from '../data/followDatabase';
import express from "express";

export const followRouter = express.Router()

const followDatabase = new FollowDatabase()
const userDatabase = new UserDatabase()
const followBusiness = new FollowBusiness(followDatabase, userDatabase)
const followController = new FollowController(followBusiness)

followRouter.post('/create', followController.followUser)

followRouter.delete('/delete', followController.unfollowUser)