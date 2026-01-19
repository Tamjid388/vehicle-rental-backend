import { Router } from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";



const router=Router()
router.get("/",userControllers.getAllusers)
router.put("/:userId",userControllers.updateUserByuserId)
router.put("/:userId",userControllers.updateUserByuserId)
export const usersRouter=router