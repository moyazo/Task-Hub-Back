// models/rutine.ts

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
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import User from './user';

@Table({
    tableName: 'rutines',
})
export default class Rutine extends Model<Rutine> {
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

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @HasMany(() => User)
    users!: User;
}
