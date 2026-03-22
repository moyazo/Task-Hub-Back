import { CreationOptional } from 'sequelize';
import User from '../models/user';
import { IUserAttributes, IUserCreationAttributes } from '../interfaces/user.interface';

export const findAllUsers = async () => {
    return User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'username',
            'role',
            'createdAt',
            'updatedAt',
        ],
    });
};

export const findUserById = async (id: string) => {
    return User.findByPk(id, {
        attributes: [
            'id',
            'name',
            'email',
            'username',
            'role',
            'createdAt',
            'updatedAt',
        ],
    });
};

export const findUserByEmail = async (email: string) => {
    return User.findOne({ where: { email } });
};

export const findUserByUsername = async (username: string) => {
    return User.findOne({ where: { username } });
};

export const createUser = async (data: IUserCreationAttributes) => {
    return User.create(data);
};

export const updateUserById = async (
    id: string,
    data: Partial<IUserAttributes>
) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update(data);
    return user;
};

export const deleteUserById = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
};
