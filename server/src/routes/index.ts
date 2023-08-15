import { Router } from "express"
import AuthRouter from "./auth.route"
import TodoRouter from "./todo.route"
import UserRouter from "./user.route"
import { protect } from "../middlewares/auth"

const router: Router = Router()

router.use(AuthRouter)
router.use(protect, TodoRouter)
router.use(UserRouter)

export default router