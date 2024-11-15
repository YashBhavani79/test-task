import * as express from "express";
import todoRoutes from "./todoRouter";
import userRoutes from "./userRouter";

const Routes = express.Router();

Routes.use("/todo", todoRoutes);
Routes.use("/user", userRoutes);

export default Routes;
