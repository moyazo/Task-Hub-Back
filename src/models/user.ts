import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { IUserAttributes } from '../interfaces/user.interface';


type UserCreationAttributes = Optional<
  IUserAttributes,
  'id' | 'role' | 'createdAt' | 'updatedAt'
>;

@Table({
  tableName: 'users',
})
export default class User extends Model<IUserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER',
  })
  declare role: 'ADMIN' | 'USER';

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}