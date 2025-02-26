import express from "express";
import bodyParser from "body-parser";
import AppError from "./helpers/appError";
import { APP, DATABASE } from "./constants";
import sequelize from "./config/db/sequelize";
import { catchError } from "./helpers";
import globalErrorController from "./helpers/globalErrorController";
import { router } from "./routes";

const port = APP.APP_PORT;

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);

app.listen(port, async () => {
  const [error] = await catchError(sequelize.authenticate());
  if (error) {
    console.log("Unable to connect to the database:", error);
    return;
  }

  if (!error) {
    console.log(
      `Connection has been established successfully with ${DATABASE.NAME}.`
    );
  }
  console.log(`Server is running on port ${port}`);
});

app.use("/api", router);

app.get("/api/todos/test", (req: express.Request, res: express.Response) => {
  res.send({
    message: "Hello i am working",
  });
});

app.use(
  (
    err: AppError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => globalErrorController(err, req, res, next)
);
