import db from '../models';
import Category from '../models/category';
import Ambit from '../models/ambit';
import { CategoryCreationAttributes } from '../interfaces/category.interface';

const categoryModel = db.sequelize.models.Category as typeof Category;

export type UpdateCategoryRepositoryInput = Partial<{
    name: string;
    ambit_id: string;
}>;

export const findAllCategories = async () => {
    return categoryModel.findAll({
        include: [
            {
                model: Ambit,
                attributes: ['id', 'name'],
            },
        ],
        order: [['name', 'ASC']],
    });
};

export const findCategoryById = async (id: string) => {
    return categoryModel.findByPk(id, {
        include: [
            {
                model: Ambit,
                attributes: ['id', 'name'],
            },
        ],
    });
};

export const findCategoryByNameAndAmbitId = async (
    name: string,
    ambit_id: string
) => {
    return categoryModel.findOne({
        where: { name, ambit_id },
    });
};

export const createCategory = async (data: CategoryCreationAttributes) => {
    return categoryModel.create({
        name: data.name,
        ambit_id: data.ambit_id,
    });
};

export const updateCategoryById = async (
    id: string,
    data: UpdateCategoryRepositoryInput
) => {
    const category = await categoryModel.findByPk(id);
    if (!category) return null;

    await category.update(data);
    return category;
};

export const deleteCategoryById = async (id: string) => {
    const category = await categoryModel.findByPk(id);
    if (!category) return false;

    await category.destroy();
    return true;
};
