import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const diet = db.sequelize.models.Diet;

export const getAll = async (): Promise<Array<typeof diet> | null> => {
    const dietsFromDB = await diet.findAll();
    if (!dietsFromDB) {
        return null;
    }
    return dietsFromDB;
};

export const getById = async (id: string): Promise<typeof diet | null> => {
    if (!id) {
        return null;
    }
    const dietFromDB = await diet.findOne({ where: { id } });
    if (!dietFromDB) {
        return null;
    }

    return dietFromDB;
};

export const createDiet = async (
    body: InferCreationAttributes<typeof diet>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await diet.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyDiet = async (
    id: string,
    body: InferCreationAttributes<typeof diet>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const dietToModify = await diet.findOne({ where: { id } });
    if (!dietToModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await diet.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeDiet = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const dietToModify = await diet.findOne({ where: { id } });
    if (!dietToModify) {
        return false;
    }

    const updated = await diet.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
