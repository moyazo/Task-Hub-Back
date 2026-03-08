// models/user.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    HasOne,
    HasMany,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import Diet from './diet';
import Rutine from './rutine';
import Training from './training';
import Goal from './goal';
import UserGoal from './usergoal';

@Table({
    tableName: 'users',
})
export default class User extends Model<User> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    email!: string;

    @Column(DataType.TEXT)
    password!: string;

    @Column(DataType.TEXT)
    username!: string;

    @Column(DataType.ENUM('ADMIN', 'NORMAL'))
    role!: string;

    @Column(DataType.INTEGER)
    height!: number;

    @Column(DataType.INTEGER)
    weight!: number;

    @Column(DataType.ENUM('Male', 'Woman', 'Other'))
    sex!: string;

    @Column(DataType.INTEGER)
    age!: number;

    @Column(DataType.INTEGER)
    imc!: number;

    @Column(DataType.INTEGER)
    tmb!: number;

    @Column(DataType.INTEGER)
    tdee!: number;

    @Column(DataType.INTEGER)
    fat!: number;

    @Column(DataType.INTEGER)
    muscle!: number;

    @Column(DataType.INTEGER)
    bony!: number;

    @Column(DataType.ENUM('1', '2', '3', '4', '5'))
    fitnessStyle!: string;

    @ForeignKey(() => Training)
    @Column(DataType.UUID)
    training_id!: string;

    @ForeignKey(() => Diet)
    @Column(DataType.UUID)
    diet_id!: string;

    @ForeignKey(() => Rutine)
    @Column(DataType.UUID)
    rutine_id!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @BelongsTo(() => Diet)
    diet!: Diet;

    @BelongsTo(() => Rutine)
    rutine!: Rutine;

    @BelongsTo(() => Training)
    training!: Training;

    @BelongsToMany(() => Goal, () => UserGoal)
    goals!: Goal[];
}
