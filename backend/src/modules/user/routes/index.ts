import * as express from "express";
import { catchAsync } from "../../../helpers";
import { loginController, registerController } from "../controllers";
import { validateRegister } from "../validation";
const userRouter: express.Router = express.Router();

userRouter.post("/register", [
  catchAsync(validateRegister),
  catchAsync(registerController),
]);

userRouter.post("/login", catchAsync(loginController));

export { userRouter };
