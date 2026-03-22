import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { NonAttribute } from 'sequelize';

import Ambit from './ambit';
import Task from './task';
import {
    ICategoryAttributes,
    CategoryCreationAttributes,
} from '../interfaces/category.interface';

@Table({
    tableName: 'categories',
})
export default class Category extends Model<
    ICategoryAttributes,
    CategoryCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @ForeignKey(() => Ambit)
    @Column(DataType.UUID)
    declare ambit_id: string;

    @BelongsTo(() => Ambit)
    declare ambit?: NonAttribute<Ambit>;

    @HasMany(() => Task)
    declare tasks?: NonAttribute<Task[]>;
}
