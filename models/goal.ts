// models/goal.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    CreatedAt,
    UpdatedAt,
    HasMany,
    ForeignKey,
    BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import User from './user'; // Asegúrate de importar el modelo
import UserGoal from './usergoal';

@Table({
    tableName: 'goals',
})
export default class Goal extends Model<Goal> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    user_id!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @BelongsToMany(() => User, () => UserGoal)
    users!: User[];
}
