// models/scene.ts

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
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: 'scenes',
})
export default class Scene extends Model<Scene> {
    @PrimaryKey
    @Default(() => uuidv4())
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    title!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;
}
