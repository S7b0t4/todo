import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Task } from "src/task/dto/task.model";

interface UserCreationAttrs{
  email: string,
  password: string,
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({type: DataType.STRING, allowNull: false})
  name: string
  @Column({type: DataType.STRING, allowNull: false})
  email: string
  @Column({type: DataType.STRING, allowNull: false})
  password: string
  @HasMany(() => Task)
  task: Task[]
}
