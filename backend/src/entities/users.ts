import {
  Column,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table,
} from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";
import { Todos } from "./todos";

@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ["password"] },
  },
  withPassword: {
    attributes: { include: ["password"] },
  },
}))
@Table({
  timestamps: true,
  tableName: "users",
  defaultScope: {
    attributes: { exclude: ["password"] },
  },
})
class Users extends Model<Users> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidV4(),
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Todos)
  todos: Todos[];
}
export { Users };
