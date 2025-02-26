export const APP = {
  APP_PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  APP_ENV: process.env.APP_ENV,
};

export const DATABASE = {
  HOST: process.env.DB_HOST,
  PORT: parseInt(process.env.DB_PORT || ""),
  USER: process.env.DB_USER || "",
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME || "",
  SYNC: process.env.DB_SYNC === "true",
  MONGO_DB_URI: process.env.MONGO_DB_URI,
};

export const JWT = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRY: process.env.JWT_EXPIRY,
};

export const SALT_ROUNDS = 5;

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const ERRORS = {
  UNAUTHORIZED_USER: "Unauthorized user",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const SUCCESS_MESSAGES = {};
