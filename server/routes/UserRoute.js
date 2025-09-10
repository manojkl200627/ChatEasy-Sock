import express from 'express'
import { getAllUsers, getBySetect, getFrds, login, register } from '../controller/UserController.js'

const userRoute = express.Router()

userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/allusers/:id", getAllUsers);
userRoute.post("/frds/:userId",getBySetect)
userRoute.get("/getfrd/:userId",getFrds)
export default userRoute