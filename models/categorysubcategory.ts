import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Category from './category';
import Subcategory from './subcategory';

@Table({
    tableName: 'categorysubcategories',
    timestamps: true,
})
export default class CategorySubcategory extends Model<CategorySubcategory> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
    })
    declare id: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    category_id!: string;

    @ForeignKey(() => Subcategory)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    subCategory_id!: string;

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
