import { InferCreationAttributes } from 'sequelize';
import { getById as getRutineById } from './rutine';
import { getById as getDietById } from './diet';
import { getById as getTrainingById } from './training';
import db from '../../models';
import { TogglesType } from '../common/TogglesType';
const user = db.sequelize.models.User;

export const getAll = async (): Promise<Array<typeof user> | null> => {
    const usersFromDB = await user.findAll();
    if (!usersFromDB) {
        return null;
    }
    return usersFromDB;
};

export const getById = async (id: string): Promise<typeof user | null> => {
    if (!id) {
        return null;
    }
    const userFromDB = await user.findOne({ where: { id } });
    if (!userFromDB) {
        return null;
    }

    return userFromDB;
};

export const getByEmail = async (
    email: string
): Promise<typeof user | null> => {
    if (!email) {
        return null;
    }
    const userFound = await user.findOne({ where: { email } });
    if (!userFound) {
        return null;
    }

    return userFound.dataValues;
};

export const createUser = async (
    body: InferCreationAttributes<typeof user>
): Promise<boolean> => {
    if (!body) {
        return false;
    }
    body.forEach((userData: any) => {
        if (!userData) {
            return false;
        }
    });
    const created = await user.create({ body });
    if (!created) {
        return false;
    }

    return true;
};

export const modifyUser = async (
    id: string,
    body: InferCreationAttributes<typeof user>
): Promise<boolean> => {
    if (!body || !id) {
        return false;
    }

    const usertoModify = await user.findOne({ where: { id } });
    if (!usertoModify) {
        return false;
    }

    const dataToModify = { ...body };

    const updated = await user.update(dataToModify, { where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const removeUser = async (id: string): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const usertoModify = await user.findOne({ where: { id } });
    if (!usertoModify) {
        return false;
    }

    const updated = await user.destroy({ where: { id } });
    if (!updated) {
        return false;
    }

    return true;
};

export const configData = async (
    id: string,
    body: InferCreationAttributes<typeof user> | null
): Promise<boolean> => {
    if (!id) {
        return false;
    }

    const userToModify = await user.findOne({ where: { id } });
    if (!userToModify) {
        return false;
    }

    // Si no hay body, reseteamos los campos
    if (!body) {
        const resetFields = {
            imc: null,
            tmb: null,
            tdee: null,
            fat: null,
            muscle: null,
            bony: null,
            weight: null,
            height: null,
            age: null,
            fitnessStyle: null,
            sex: null,
        };

        const [reset] = await user.update(resetFields, { where: { id } });
        return reset > 0;
    }

    const { weight, height, age, sex, fat, muscle, bony, fitnessStyle } = body;

    // Validación mínima
    if (
        weight == null ||
        height == null ||
        age == null ||
        !fitnessStyle ||
        fat == null ||
        muscle == null ||
        bony == null
    ) {
        return false;
    }

    // Parsear fitnessStyle a número para TDEE
    const activityFactor = parseInt(fitnessStyle, 10);
    if (isNaN(activityFactor)) {
        return false;
    }

    // Cálculos
    const imc = Math.round(weight / (height / 100) ** 2);
    const tmb =
        sex === 'Male'
            ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
            : Math.round(10 * weight + 6.25 * height - 5 * age - 161);

    const tdee = Math.round(tmb * activityFactor);

    // Preparamos los datos para actualización
    const dataToModify = {
        ...body,
        imc,
        tmb,
        tdee,
    };

    const [updated] = await user.update(dataToModify, { where: { id } });
    return updated > 0;
};

export const toggleFollowRutine = async (
    id: string,
    rutine_id: string
): Promise<TogglesType> => {
    if (!id || !rutine_id) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    const userToModify = await user.findOne({ where: { id } });
    if (!userToModify) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    const rutineExists = await getRutineById(rutine_id);
    if (!rutineExists) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    if (userToModify.rutine_id === rutine_id) {
        const updated = await user.update(
            { rutine_id: null },
            { where: { id } }
        );
        return {
            updated: !!updated,
            toggle: 'unfollowed',
        };
    } else {
        const updated = await user.update({ rutine_id }, { where: { id } });
        return {
            updated: !!updated,
            toggle: 'followed',
        };
    }
};

export const toggleFollowDiet = async (
    id: string,
    diet_id: string
): Promise<TogglesType> => {
    if (!id || !diet_id) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    const userToModify = await user.findOne({ where: { id } });
    if (!userToModify) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    const dietExists = await getDietById(diet_id);
    if (!dietExists) {
        return {
            updated: false,
            toggle: 'error',
        };
    }

    if (userToModify.diet_id === diet_id) {
        const updated = await user.update({ diet_id: null }, { where: { id } });
        return {
            updated: !!updated,
            toggle: 'unfollowed',
        };
    } else {
        const updated = await user.update({ diet_id }, { where: { id } });
        return {
            updated: !!updated,
            toggle: 'followed',
        };
    }
};

export const toggleStartTraining = async (
    id: string,
    training_id: string
): Promise<TogglesType> => {
    let ToggleReturn: TogglesType = {
        updated: false,
        toggle: '',
    };
    if (!id || !training_id) {
        ToggleReturn.toggle = 'error';
        return ToggleReturn;
    }

    const userToModify = await user.findOne({ where: { id } });
    if (!userToModify) {
        ToggleReturn.toggle = 'error';
        return ToggleReturn;
    }

    const trainingExists = await getTrainingById(training_id);
    if (!trainingExists) {
        ToggleReturn.toggle = 'error';
        return ToggleReturn;
    }

    // Si ya está en un entrenamiento, lo termina (quitamos training_id)
    if (userToModify.training_id === training_id) {
        const updated = await user.update(
            { training_id: null },
            { where: { id } }
        );
        ToggleReturn.updated = !!updated;
        ToggleReturn.toggle = 'stopped';
        return ToggleReturn;
    } else {
        const updated = await user.update({ training_id }, { where: { id } });
        ToggleReturn.updated = !!updated;
        ToggleReturn.toggle = 'started';
        return ToggleReturn;
    }
};
