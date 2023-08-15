import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as TodoService from "../services/todo.service";
import { findUserById } from "../services/user.service";
import { ITodo } from "../types/todo";
import { BadRequestError } from "../helpers/errors";
import { IUser } from "../types/user";

const getTodos = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoService.findAllTodos();
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Get todos error:", error);
    return next(error);
  }
}

const getTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todo: ITodo = await TodoService.findTodoById(req.params.id);
    res.status(200).json({ todo });
  } catch (error) {
    console.error("Get todo error:", error);
    return next(error);
  }
}

const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array().map((error) => error.msg).join(", "));
    }

    const todoData: Pick<ITodo, "name" | "description" | "done" | "user_id"> = req.body;
    const user: IUser = await findUserById(todoData.user_id);
    const newTodo: ITodo = await TodoService.createTodo({
      name: todoData.name,
      description: todoData.description,
      done: todoData.done,
      user_id: user.id
    });

    res.status(201).json({ todo: newTodo });
  } catch (error) {
    console.error("Create todo error:", error);
    return next(error);
  }
}

const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todoData: ITodo = req.body;
    await TodoService.updateTodoById(req.params.id, todoData);
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    console.error("Update todo error:", error);
    return next(error);
  }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await TodoService.deleteTodoById(req.params.id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Delete todo error:", error);
    return next(error);
  }
}

const getTodosByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoService.findAllTodosByUser(req.params.id);
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Get todos by user id error:", error);
    return next(error);
  }
}

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo, getTodosByUser };