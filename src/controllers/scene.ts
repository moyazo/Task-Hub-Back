import { InferCreationAttributes } from 'sequelize';
import db from '../../models';
const scene = db.sequelize.models.Scene;

export const getAll = async (): Promise<Array<typeof scene> | null> => {
    const scenesFromDB = await scene.findAll();
    if (!scenesFromDB) {
        return null;
    }
    return scenesFromDB;
};

export const getById = async (id: string): Promise<typeof scene | null> => {
    if (!id) {
        return null;
    }
    const sceneFromDB = await scene.findOne({ where: { id } });
    if (!sceneFromDB) {
        return null;
    }

    return sceneFromDB;
};

export const createScene = async (
    body: InferCreationAttributes<typeof scene>
): Promise<boolean> => {
    // TODO:  SE for use IA and consulte GOALs
    if (!body) {
        return false;
    }

    const dataToCreate = { ...body };

    const created = await scene.create(dataToCreate);
    if (!created) {
        return false;
    }

    return true;
};

export const modifyScene = async (
    id: string,
    body: InferCreationAttributes<typeof scene>
): Promise<boolean> => {
    // TODO:  SE for use IA and consulte GOALs
    if (!body || !id) {
        return false;
    }

    const scenetoModify = await scene.findOne({ where: { id } });
    if (!scenetoModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await scene.update(dataToModify, { where: { id } });
    if (!updated[0]) {
        return false;
    }

    return true;
};

export const removeScene = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const sceneToModify = await scene.findOne({ where: { id } });
    if (!sceneToModify) {
        return false;
    }

    const updated = await scene.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};
