import { AmbitCreationAttributes } from '../interfaces/ambit.interface';
import db from '../models';
import Ambit from '../models/ambit';

const ambitModel = db.sequelize.models.Ambit as typeof Ambit;

export type UpdateAmbitRepositoryInput = Partial<{
    name: string;
}>;

export const findAllAmbits = async () => {
    return ambitModel.findAll({
        order: [['name', 'ASC']],
    });
};

export const findAmbitById = async (id: string) => {
    return ambitModel.findByPk(id);
};

export const createAmbit = async (data: AmbitCreationAttributes) => {
    return ambitModel.create({
        name: data.name,
    });
};

export const updateAmbitById = async (
    id: string,
    data: UpdateAmbitRepositoryInput
) => {
    const ambit = await ambitModel.findByPk(id);
    if (!ambit) return null;

    await ambit.update(data);
    return ambit;
};

export const deleteAmbitById = async (id: string) => {
    const ambit = await ambitModel.findByPk(id);
    if (!ambit) return false;

    await ambit.destroy();
    return true;
};
