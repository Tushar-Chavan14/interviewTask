import * as express from "express";
import { catchAsync } from "../../../helpers";
import { validateAddTodo, validateUpdateTodo } from "../validation";
import {
  addTodoController,
  deleteTodoController,
  getTodosController,
  updateTodoController,
} from "../controllers";
import { authenticate } from "../../middelware";
const todosRouter: express.Router = express.Router();

todosRouter
  .route("/")
  .post([
    authenticate,
    catchAsync(validateAddTodo),
    catchAsync(addTodoController),
  ])
  .get([authenticate, catchAsync(getTodosController)]);

todosRouter
  .route("/:todoId")
  .patch([
    authenticate,
    catchAsync(validateUpdateTodo),
    catchAsync(updateTodoController),
  ])
  .delete([authenticate, catchAsync(deleteTodoController)]);

export { todosRouter };
