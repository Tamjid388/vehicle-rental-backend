import { Router } from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";



const router=Router()
router.get("/",auth("admin"),userControllers.getAllusers)
router.put("/:userId",auth("admin","customer"),userControllers.updateUserByuserId)
router.delete("/:userId",auth("admin"),userControllers.DeleteUserByuserId)
export const usersRouter=router