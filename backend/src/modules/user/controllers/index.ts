import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { HTTP_STATUS, JWT, SALT_ROUNDS } from "../../../constants";
import { Users } from "../../../entities/users";
import jwt from "jsonwebtoken";
import { catchError } from "../../../helpers";
import AppError from "../../../helpers/appError";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password) {
    return next(
      new AppError(
        "Please provide name, email and password",
        HTTP_STATUS.BAD_REQUEST
      )
    );
  }

  const userExist = await Users.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (userExist) {
    return next(
      new AppError(
        "User with this email already exists",
        HTTP_STATUS.BAD_REQUEST
      )
    );
  }

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const userPayload = {
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  };

  const [error, user] = await catchError(Users.create(userPayload));

  const userWithoutPassword = user.get({ plain: true });
  delete userWithoutPassword.password;

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.BAD_REQUEST));
  }

  const jwtToken = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    JWT.SECRET_KEY as string,
    {
      expiresIn: JWT.EXPIRY,
    } as jwt.SignOptions
  );

  return res.status(201).json({
    data: {
      user: userWithoutPassword,
      jwtToken,
    },
  });
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "Please provide email and password",
    });
  }

  const [error, user] = await catchError(
    Users.scope("withPassword").findOne({
      where: {
        email: email.toLowerCase(),
      },
    })
  );

  if (error) {
    return next(new AppError(error.message, HTTP_STATUS.SERVER_ERROR));
  }

  if (!user) {
    return next(
      new AppError("Invalid email or password", HTTP_STATUS.BAD_REQUEST)
    );
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return next(
      new AppError("Invalid email or password", HTTP_STATUS.BAD_REQUEST)
    );
  }

  const jwtToken = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    JWT.SECRET_KEY as string,
    {
      expiresIn: JWT.EXPIRY,
    } as jwt.SignOptions
  );

  const userWithoutPassword = user.get({ plain: true });
  delete userWithoutPassword.password;

  return res.status(200).json({
    data: {
      user: userWithoutPassword,
      jwtToken,
    },
  });
};

export { registerController, loginController };
