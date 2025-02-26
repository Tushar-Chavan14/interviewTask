import { Sequelize } from "sequelize-typescript";
import { APP, DATABASE } from "../../constants";
import { Todos } from "../../entities/todos";
import { Users } from "../../entities/users";

const sequelize = new Sequelize(
  DATABASE.NAME,
  DATABASE.USER,
  DATABASE.PASSWORD,
  {
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    dialect: "postgres",
    models: [Todos, Users],
    logging: APP.APP_ENV === "local" ? console.log : false,
  }
);

if (DATABASE.SYNC) {
  sequelize.sync({ alter: true });
}

export default sequelize;
