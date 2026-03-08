import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const subcategory = db.sequelize.models.Subcategory;

export const getAll = async (): Promise<Array<typeof subcategory> | null> => {
    const categoriesFromDB = await subcategory.findAll();
    if (!categoriesFromDB) {
        return null;
    }
    return categoriesFromDB;
};

export const getById = async (
    id: string
): Promise<typeof subcategory | null> => {
    if (!id) {
        return null;
    }
    const subcategoryFromDB = await subcategory.findOne({ where: { id } });
    if (!subcategoryFromDB) {
        return null;
    }

    return subcategoryFromDB;
};

export const getByType = async (
    type: string
): Promise<typeof subcategory | null> => {
    if (!type) {
        return null;
    }
    console.log(type);
    const subcategoryFound = await subcategory.findOne({ where: { type } });
    if (!subcategoryFound) {
        return null;
    }

    return subcategoryFound;
};

export const createSubcategory = async (
    body: InferCreationAttributes<typeof subcategory>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await subcategory.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifySubcategory = async (
    id: string,
    body: InferCreationAttributes<typeof subcategory>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const subcategorytoModify = await subcategory.findOne({ where: { id } });
    if (!subcategorytoModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await subcategory.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeSubcategory = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const subcategoryToModify = await subcategory.findOne({ where: { id } });
    if (!subcategoryToModify) {
        return false;
    }

    const updated = await subcategory.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
