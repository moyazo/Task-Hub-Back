import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const rutine = db.sequelize.models.Rutine;

export const getAll = async (): Promise<Array<typeof rutine> | null> => {
    const rutinesFromDB = await rutine.findAll();
    if (!rutinesFromDB) {
        return null;
    }
    return rutinesFromDB;
};

export const getById = async (id: string): Promise<typeof rutine | null> => {
    if (!id) {
        return null;
    }
    const rutineFromDB = await rutine.findOne({ where: { id } });
    if (!rutineFromDB) {
        return null;
    }

    return rutineFromDB;
};

export const createRutine = async (
    body: InferCreationAttributes<typeof rutine>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await rutine.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyRutine = async (
    id: string,
    body: InferCreationAttributes<typeof rutine>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const rutineToModify = await rutine.findOne({ where: { id } });
    if (!rutineToModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await rutine.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeRutine = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const rutineToModify = await rutine.findOne({ where: { id } });
    if (!rutineToModify) {
        return false;
    }

    const updated = await rutine.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
