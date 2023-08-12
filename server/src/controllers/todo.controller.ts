import { Response, Request } from "express";
import { validationResult } from "express-validator";
import * as TodoService from "../services/todo.service";
import { ITodo } from "./../types/todo";

const getTodos = async (_: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoService.findAllTodos();
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "An error occurred while getting todos" });
  }
}

const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo: ITodo = await TodoService.findTodoById(req.params.id);
    res.status(200).json({ todo });
  } catch (error) {
    console.error("Get todo error:", error);
    res.status(500).json({ message: "An error occurred while getting todo" });
  }
}

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const todoData: Pick<ITodo, "name" | "description" | "done"> = req.body;
    const newTodo: ITodo = await TodoService.createTodo({
      name: todoData.name,
      description: todoData.description,
      done: todoData.done,
    });

    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({ message: "An error occurred while creating todo" });
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoData: ITodo = req.body;
    await TodoService.updateTodoById(req.params.id, todoData);
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "An error occurred while updating todo" });
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    await TodoService.deleteTodoById(req.params.id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "An error occurred while deleting todo" });
  }
}

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };