import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import User from './user';
import Goal from './goal';

@Table({
    tableName: 'usergoals',
    timestamps: true,
})
export default class UserGoal extends Model<UserGoal> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare user_id: string;

    @ForeignKey(() => Goal)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare goal_id: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare updatedAt: Date;
}
