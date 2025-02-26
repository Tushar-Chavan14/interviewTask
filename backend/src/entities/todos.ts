import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";
import { Users } from "./users";

@Table({
  timestamps: true,
  tableName: "todos",
})
class Todos extends Model<Todos> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidV4(),
  })
  todoId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;
}
export { Todos };
