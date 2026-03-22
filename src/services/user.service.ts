import bcrypt from 'bcrypt';
import {
    findAllUsers,
    findUserById,
    findUserByEmail,
    findUserByUsername,
    updateUserById,
    deleteUserById,
} from '../repositories/user.repository';
import {
    OK,
    NOT_FOUND,
    INVALID_ACTION,
    SUCCESS_TO_MODIFY,
    SUCCESS_TO_REMOVE,
    FAIL_TO_MODIFY,
    NOT_FOUND_MESSAGE,
} from '../common/constants';

type UpdateUserServiceInput = Partial<{
    name: string;
    email: string;
    username: string;
    password: string;
    role: 'ADMIN' | 'USER';
}>;

export const getAllUsersService = async () => {
    const users = await findAllUsers();

    return {
        ok: true,
        statusCode: OK,
        message: 'Users fetched successfully',
        data: users,
    };
};

export const getUserByIdService = async (id: string) => {
    const user = await findUserById(id);

    if (!user) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: 'User fetched successfully',
        data: user,
    };
};

export const getCurrentUserService = async (userId: string) => {
    const user = await findUserById(userId);

    if (!user) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: 'Current user fetched successfully',
        data: user,
    };
};

export const updateUserService = async (
    id: string,
    body: UpdateUserServiceInput
) => {
    const existingUser = await findUserById(id);

    if (!existingUser) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    if (body.email) {
        const userWithSameEmail = await findUserByEmail(body.email);

        if (userWithSameEmail && userWithSameEmail.id !== id) {
            return {
                ok: false,
                statusCode: INVALID_ACTION,
                message: 'Email already in use',
            };
        }
    }

    if (body.username) {
        const userWithSameUsername = await findUserByUsername(body.username);

        if (userWithSameUsername && userWithSameUsername.id !== id) {
            return {
                ok: false,
                statusCode: INVALID_ACTION,
                message: 'Username already in use',
            };
        }
    }

    const dataToUpdate: UpdateUserServiceInput = { ...body };

    if (body.password) {
        dataToUpdate.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await updateUserById(id, dataToUpdate);

    if (!updatedUser) {
        return {
            ok: false,
            statusCode: INVALID_ACTION,
            message: FAIL_TO_MODIFY,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: SUCCESS_TO_MODIFY,
        data: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            username: updatedUser.username,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        },
    };
};

export const deleteUserService = async (id: string) => {
    const deleted = await deleteUserById(id);

    if (!deleted) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: SUCCESS_TO_REMOVE,
    };
};
