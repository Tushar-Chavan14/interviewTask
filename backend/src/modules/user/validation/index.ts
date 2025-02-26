import yup from "yup";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../helpers";
import AppError from "../../../helpers/appError";

const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(35).required(),
});

const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const { success, errors } = await validateSchema(registerSchema, {
    name,
    email,
    password,
  });

  if (!success) {
    return next(new AppError("Validation failed", 400, errors));
  }

  next();
};

export { validateRegister };
