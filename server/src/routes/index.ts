import { Router } from "express"
import AuthRouter from "./auth.route"
import TodoRouter from "./todo.route"
import UserRouter from "./user.route"

const router: Router = Router()

router.use(AuthRouter)
router.use(TodoRouter)
router.use(UserRouter)

export default router