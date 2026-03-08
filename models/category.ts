// models/category.ts

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
import Training from './training';
import Diet from './diet';
import Subcategory from './subcategory';
import CategorySubcategory from './categorysubcategory';
import { CategoryType } from '../src/common/CategoryType';

@Table({
    tableName: 'categories',
})
export default class Category extends Model<Category> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.ENUM(...Object.values(CategoryType)))
    type!: CategoryType;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @HasMany(() => Training)
    trainings!: Training[];

    @HasMany(() => Diet)
    diets!: Diet[];

    @BelongsToMany(() => Subcategory, () => CategorySubcategory)
    subCategories!: Subcategory[];
}
