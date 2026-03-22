import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { NonAttribute } from 'sequelize';

import User from './user';
import Category from './category';
import {
    ITaskAttributes,
    TaskCreationAttributes,
    TaskStatus,
    TaskPriority,
} from '../interfaces/task.interface';

@Table({
    tableName: 'tasks',
})
export default class Task extends Model<
    ITaskAttributes,
    TaskCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.TEXT)
    declare description: string;

    @Column(DataType.ENUM('TODO', 'DOING', 'DONE'))
    declare status: TaskStatus;

    @Column(DataType.ENUM('LOW', 'MEDIUM', 'HIGH'))
    declare priority: TaskPriority;

    @Column(DataType.DATE)
    declare dueDate: Date;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare user_id: string;

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    declare category_id: string;

    @BelongsTo(() => User)
    declare user?: NonAttribute<User>;

    @BelongsTo(() => Category)
    declare category?: NonAttribute<Category>;
}
