import { Router } from "express"
import AuthRouter from "./auth.route"
import TodoRouter from "./todo.route"

const router: Router = Router()

router.use(AuthRouter)
router.use(TodoRouter)

export default router