import express from "express";
import jwt from "jsonwebtoken";
import { ERRORS, HTTP_STATUS, JWT } from "../../constants";
import AppError from "../../helpers/appError";

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const jwtToken = authHeader?.split(" ")[1];

    if (!jwtToken) {
      return next(
        new AppError(ERRORS.UNAUTHORIZED_USER, HTTP_STATUS.UNAUTHORIZED)
      );
    }

    const decodedUser = verifyToken(jwtToken);

    if (!decodedUser) {
      return next(
        new AppError(ERRORS.UNAUTHORIZED_USER, HTTP_STATUS.UNAUTHORIZED)
      );
    }

    req["user"] = decodedUser;
    return next();
  } catch (error) {
    console.error("[Auth.authenticate] Unexpected error: ", error);
    return next(
      new AppError(ERRORS.INTERNAL_SERVER_ERROR, HTTP_STATUS.SERVER_ERROR)
    );
  }
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT.SECRET_KEY);
  } catch (error) {
    throw error;
  }
};

export { authenticate };
