import { Router } from "express"
import { getTodos, getTodo, addTodo, updateTodo, deleteTodo } from "../services/todos"
import AuthRouter from "./auth.route"


const router: Router = Router()

router.get("/todos", getTodos)
router.get("/todos/:id", getTodo)
router.post("/todos", addTodo)
router.put("/todos/:id", updateTodo)
router.delete("/todos/:id", deleteTodo)

router.use(AuthRouter)


export default router