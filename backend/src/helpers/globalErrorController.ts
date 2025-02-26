import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import { APP } from "../constants";

const handleValidationError = (err: any): AppError => {
  return new AppError(err.message, 400);
};

const handleJWTError = (): AppError => {
  return new AppError("Invalid token, Please login again", 401);
};

const handleJWTExpiredError = (): AppError => {
  return new AppError("Your token has expired! Please log in again", 401);
};

const handleSequelizeDatabaseError = (err: any): AppError => {
  const message = `Database error: ${err.message}`;
  return new AppError(message, 400);
};

const sequelizeForeignKeyConstraintError = (err: any): AppError => {
  const message = `${err.message}`;
  return new AppError(message, 400);
};

const handleSequelizeUniqueConstraintError = (err: any): AppError => {
  const message = `Duplicate value found: ${err.errors[0].message}`;
  return new AppError(message, 400);
};

const handleSequelizeConnectionError = (err: any): AppError => {
  const message = "Unable to connect to the database. Please try again later.";
  return new AppError(message, 503);
};

const handleEntityNotFoundError = (): AppError => {
  return new AppError("The requested resource could not be found.", 404);
};

const handleSyntaxError = (err: any): AppError => {
  return new AppError("Invalid JSON payload.", 400);
};

const devError = (err: AppError, errName: string, res: Response): Response => {
  console.log({ stack: err.stack });
  return res.status(err.statusCode).json({
    name: errName,
    status: err.statusCode,
    message: err.message,
    error: err.errors,
  });
};

const productionError = (
  err: AppError,
  errName: string,
  res: Response
): Response => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      name: errName,
      status: err.statusCode,
      message: err.message,
      error: err.errors,
    });
  } else {
    console.error("Error :bomb:", err);
    return res.status(500).json({
      name: errName,
      status: 500,
      message: "Something went wrong",
    });
  }
};

const globalErrorController = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (APP.APP_ENV === "local") {
    devError(err, err.name, res);
  } else if (APP.APP_ENV === "dev" || APP.APP_ENV === "prod") {
    let error = err;
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "SequelizeForeignKeyConstraintError")
      error = sequelizeForeignKeyConstraintError(error);
    if (error.name === "SequelizeDatabaseError")
      error = handleSequelizeDatabaseError(error);
    if (error.name === "SequelizeUniqueConstraintError")
      error = handleSequelizeUniqueConstraintError(error);
    if (error.name === "SequelizeConnectionError")
      error = handleSequelizeConnectionError(error);
    if (error.name === "EntityNotFoundError")
      error = handleEntityNotFoundError();
    if (error.name === "SyntaxError") error = handleSyntaxError(error);

    productionError(error, err.name, res);
  }
};

export default globalErrorController;
