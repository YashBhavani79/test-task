import * as express from "express";
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
} from "../controller/user/userController";
import { paginationMiddleware } from "../comman/pagination";
import { UrlHandler } from "../comman/urlHandler";
import { userValidator } from "../comman/validator/userValidator";

const Routes = express.Router();

Routes.post(UrlHandler.user.createUser, userValidator, createUser);
Routes.get(UrlHandler.user.getAllUser, paginationMiddleware, getAllUser);
Routes.get(UrlHandler.user.getUser, getUser);
Routes.put(UrlHandler.user.updateUser, updateUser);
Routes.delete(UrlHandler.user.deleteUser, deleteUser);
export default Routes;
