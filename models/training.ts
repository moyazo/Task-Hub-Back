// models/training.ts

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
    HasOne,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Category from './category'; // Asumiendo que existe
import User from './user';

@Table({
    tableName: 'trainings',
})
export default class Training extends Model<Training> {
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

    @ForeignKey(() => Category)
    @AllowNull(false)
    @Column(DataType.UUID)
    category_id!: string;

    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @BelongsTo(() => Category)
    category!: Category;

    @HasMany(() => User)
    users!: User[];
}
