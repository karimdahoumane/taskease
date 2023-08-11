import { Router } from "express"
import { getTodos, getTodo, addTodo, updateTodo, deleteTodo } from "../services/todo.service"

const router: Router = Router()

router.get("/todos", getTodos)
router.get("/todos/:id", getTodo)
router.post("/todos", addTodo)
router.put("/todos/:id", updateTodo)
router.delete("/todos/:id", deleteTodo)

export default router