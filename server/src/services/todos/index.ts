import { Response, Request } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo: ITodo | null = await Todo.findById(req.params.id)
    res.status(200).json({ todo })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    })

    const newTodo: ITodo = await todo.save()
    res
      .status(201)
      .json({
        message: "Todo added successfully",
        todo: newTodo,
      })
  } catch (error) {
    throw error
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    await Todo.findByIdAndUpdate(
      { _id: id },
      body
    )
    res.status(200).json({
      message: "Todo updated successfully",
    })
  } catch (error) {
    throw error
  }

}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    await Todo.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({
      message: "Todo deleted successfully",
    })
  } catch (error) {
    throw error
  }
}

export { getTodos, getTodo, addTodo, updateTodo, deleteTodo }