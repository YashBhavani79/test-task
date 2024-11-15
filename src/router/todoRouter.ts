import * as express from "express";
import {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo
} from "../controller/todo/todoController";
import { paginationMiddleware } from "../comman/pagination";
import { UrlHandler } from "../comman/urlHandler";
import { todoValidator } from "../comman/validator/todoValidator";

const Routes = express.Router();

Routes.post(UrlHandler.todo.createTodo, todoValidator, createTodo);
Routes.get(UrlHandler.todo.getAllTodo, paginationMiddleware, getAllTodo);
Routes.get(UrlHandler.todo.getOneTodo, getTodo);
Routes.put(UrlHandler.todo.updateTodo, updateTodo);
Routes.delete(UrlHandler.todo.deleteTodo, deleteTodo);
export default Routes;
