import * as AuthController from "../controllers/auth.controller"
import { loginValidation, registerValidation } from "../middlewares/validation/user.validation"
import { Router } from "express"

const router: Router = Router()

router.post("/auth/register", registerValidation, AuthController.register)
router.post("/auth/login", loginValidation, AuthController.login)

export default router