import { Router } from "express"
import * as UserController from "../controllers/user.controller"

const router: Router = Router()

router.get("/users", UserController.getUsers)
router.delete("/users/:id", UserController.deleteUser)

export default router