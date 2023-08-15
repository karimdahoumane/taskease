import { Router } from "express"
import * as TodoController from "../controllers/todo.controller"
import { restrictTo } from "../middlewares/auth"
import { EUserRole } from "../types/user"

const router: Router = Router()

router.get("/todos", restrictTo(EUserRole.Admin), TodoController.getTodos)
router.get("/todos/:id", TodoController.getTodo)
router.post("/todos", TodoController.createTodo)
router.put("/todos/:id", TodoController.updateTodo)
router.delete("/todos/:id", TodoController.deleteTodo)
router.get("/todos/user/:id", TodoController.getTodosByUser)

export default router