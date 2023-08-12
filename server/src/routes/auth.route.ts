import * as AuthController from "../controllers/auth.controller"
import * as AuthValidation from "../validation/auth.validation"
import { Router } from "express"

const router: Router = Router()

router.post("/auth/register", AuthValidation.registerValidation, AuthController.register)
router.post("/auth/login", AuthValidation.loginValidation, AuthController.login)

export default router