import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const category = db.sequelize.models.Category;

export const getAll = async (): Promise<Array<typeof category> | null> => {
    const categoriesFromDB = await category.findAll();
    if (!categoriesFromDB) {
        return null;
    }
    return categoriesFromDB;
};

export const getById = async (id: string): Promise<typeof category | null> => {
    if (!id) {
        return null;
    }
    const categoryFromDB = await category.findOne({ where: { id } });
    if (!categoryFromDB) {
        return null;
    }

    return categoryFromDB;
};

export const getByType = async (
    type: string
): Promise<typeof category | null> => {
    if (!type) {
        return null;
    }
    const categoryFound = await category.findOne({ where: { type } });
    if (!categoryFound) {
        return null;
    }

    return categoryFound;
};

export const createCategory = async (
    body: InferCreationAttributes<typeof category>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await category.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyCategory = async (
    id: string,
    body: InferCreationAttributes<typeof category>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const categorytoModify = await category.findOne({ where: { id } });
    if (!categorytoModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await category.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeCategory = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const categoryToModify = await category.findOne({ where: { id } });
    if (!categoryToModify) {
        return false;
    }

    const updated = await category.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
