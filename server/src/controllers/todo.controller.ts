import { Response, Request } from "express";
import { validationResult } from "express-validator";
import * as TodoService from "../services/todo.service";
import { findUserById } from "../services/user.service";
import { ITodo } from "../types/todo";
import { BadRequestError } from "../helpers/errors";
import { IUser } from "../types/user";
import { asyncCatch } from "../helpers/asyncCatch";

const getTodos = asyncCatch(async (_: Request, res: Response): Promise<void> => {
  const todos: ITodo[] = await TodoService.findAllTodos();
  res.status(200).json({ todos });
});

const getTodo = asyncCatch(async (req: Request, res: Response): Promise<void> => {
  const todo: ITodo = await TodoService.findTodoById(req.params.id);
  res.status(200).json({ todo });
});

const createTodo = asyncCatch(async (req: Request, res: Response): Promise<void> => {
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
});

const updateTodo = asyncCatch(async (req: Request, res: Response): Promise<void> => {
  const todoData: ITodo = req.body;
  await TodoService.updateTodoById(req.params.id, todoData);
  res.status(200).json({ message: "Todo updated" });
});

const deleteTodo = asyncCatch(async (req: Request, res: Response): Promise<void> => {
  await TodoService.deleteTodoById(req.params.id);
  res.status(200).json({ message: "Todo deleted" });
});


const getTodosByUser = asyncCatch(async (req: Request, res: Response): Promise<void> => {
  const todos: ITodo[] = await TodoService.findAllTodosByUser(req.params.id);
  res.status(200).json({ todos });
});

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo, getTodosByUser };