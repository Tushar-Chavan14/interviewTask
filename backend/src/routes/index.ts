import * as express from "express";
import { userRouter } from "../modules/user/routes";
import { todosRouter } from "../modules/todos/routes";
const router: express.Router = express.Router();

router.use("/user", userRouter);
router.use("/todos", todosRouter);

export { router };
