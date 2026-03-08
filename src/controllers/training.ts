import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const training = db.sequelize.models.Training;

export const getAll = async (): Promise<Array<typeof training> | null> => {
    const trainingsFromDB = await training.findAll();
    if (!trainingsFromDB) {
        return null;
    }
    return trainingsFromDB;
};

export const getById = async (id: string): Promise<typeof training | null> => {
    if (!id) {
        return null;
    }
    const trainingFromDB = await training.findOne({ where: { id } });
    if (!trainingFromDB) {
        return null;
    }

    return trainingFromDB;
};

export const createTraining = async (
    body: InferCreationAttributes<typeof training>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await training.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyTraining = async (
    id: string,
    body: InferCreationAttributes<typeof training>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const trainingToModify = await training.findOne({ where: { id } });
    if (!trainingToModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await training.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeTraining = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const trainingToModify = await training.findOne({ where: { id } });
    if (!trainingToModify) {
        return false;
    }

    const updated = await training.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
