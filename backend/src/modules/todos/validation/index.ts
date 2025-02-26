import yup from "yup";
import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../../../helpers";
import AppError from "../../../helpers/appError";

const AddTodoSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

const UpdateTodoSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
});

const validateAddTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;

  const { success, errors } = await validateSchema(AddTodoSchema, {
    title,
    description,
  });

  if (!success) {
    return next(new AppError("Validation failed", 400, errors));
  }

  next();
};

const validateUpdateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;

  const { success, errors } = await validateSchema(UpdateTodoSchema, {
    title,
    description,
  });

  if (!success) {
    throw new AppError("Validation failed", 400, errors);
  }

  next();
};

export { validateAddTodo, validateUpdateTodo };
