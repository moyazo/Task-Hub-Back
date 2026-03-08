// models/Subcategory.ts

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
import Category from './category'; // Asumiendo que existe
import CategorySubcategory from './categorysubcategory';

@Table({
    tableName: 'subcategories',
})
export default class Subcategory extends Model<Subcategory> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name!: string;

    @AllowNull(false)
    @Column(DataType.ENUM('Diet', 'Training')) // Corrigido el enum
    type!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @BelongsToMany(() => Category, () => CategorySubcategory)
    categories!: Category[];
}
