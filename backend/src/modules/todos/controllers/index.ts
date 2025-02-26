import { Request, Response, NextFunction } from "express";
import { Todos } from "../../../entities/todos";
import { catchError } from "../../../helpers";
import AppError from "../../../helpers/appError";
import { HTTP_STATUS } from "../../../constants";

const addTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req["user"];

  const { title, description } = req.body;

  const [error, todo] = await catchError(
    Todos.create({ title, description, userId: user?.userId })
  );

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.BAD_REQUEST));
  }

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: todo,
  });
};

const getTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  const offset = page
    ? (parseInt(page as string) - 1) * parseInt(limit as string)
    : 0;
  const limitPerPage = limit ? parseInt(limit as string) : 10;

  const [error, { rows: todos, count }] = await catchError(
    Todos.findAndCountAll({
      where: { userId: req["user"].userId },
      offset,
      limit: limitPerPage,
      order: [["createdAt", "DESC"]],
    })
  );

  if (todos.length === 0) {
    return next(new AppError("No todos found", HTTP_STATUS.NOT_FOUND));
  }

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.SERVER_ERROR));
  }

  const meta = {
    page: page ? parseInt(page as string) : 1,
    limit: limitPerPage,
    total: count,
  };

  res.status(HTTP_STATUS.SUCCESS).json({
    success: true,
    data: { todos, meta },
  });
};

const updateTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  const { todoId } = req.params;

  const todoExits = await Todos.findOne({ where: { todoId } });

  if (!todoExits) {
    return next(new AppError("Todo not found", HTTP_STATUS.NOT_FOUND));
  }

  const [error, todo] = await catchError(
    Todos.update({ title, description }, { where: { todoId } })
  );

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.BAD_REQUEST));
  }

  res.status(HTTP_STATUS.SUCCESS).json({
    success: true,
    data: todo,
  });
};

const deleteTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { todoId } = req.params;

  const [error, todo] = await catchError(Todos.destroy({ where: { todoId } }));

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.BAD_REQUEST));
  }

  res.status(HTTP_STATUS.SUCCESS).json({
    success: true,
    data: todo,
  });
};

export {
  addTodoController,
  getTodosController,
  updateTodoController,
  deleteTodoController,
};
