import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

interface taskCreationAttrs{
  text: string,
  userId: number,
}

@Table({tableName: "tasks"})
export class Task extends Model<Task, taskCreationAttrs> {
  @Column({
    type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING, allowNull: false
  })
  text: string;

  @Column({
    type: DataType.BOOLEAN, allowNull: true, defaultValue: false
  })
  switch: boolean
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @BelongsTo(() => User)
  auth: User
}