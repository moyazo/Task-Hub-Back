import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { NonAttribute } from 'sequelize';
import Category from './category';
import {
    AmbitCreationAttributes,
    IAmbitAttributes,
} from '../interfaces/ambit.interface';

@Table({
    tableName: 'ambits',
})
export default class Ambit extends Model<
    IAmbitAttributes,
    AmbitCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Category)
    declare categories?: NonAttribute<Category[]>;
}
