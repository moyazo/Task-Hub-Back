import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const goal = db.sequelize.models.Goal;

export const getAll = async (): Promise<Array<typeof goal> | null> => {
    const goalsFromDB = await goal.findAll();
    if (!goalsFromDB) {
        return null;
    }
    return goalsFromDB;
};

export const getById = async (id: string): Promise<typeof goal | null> => {
    if (!id) {
        return null;
    }
    const goalFromDB = await goal.findOne({ where: { id } });
    if (!goalFromDB) {
        return null;
    }

    return goalFromDB;
};

export const createGoal = async (
    body: InferCreationAttributes<typeof goal>
): Promise<boolean> => {
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await goal.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyGoal = async (
    id: string,
    body: InferCreationAttributes<typeof goal>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const goalToModify = await goal.findOne({ where: { id } });
    if (!goalToModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await goal.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeGoal = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const goalToModify = await goal.findOne({ where: { id } });
    if (!goalToModify) {
        return false;
    }

    const updated = await goal.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
