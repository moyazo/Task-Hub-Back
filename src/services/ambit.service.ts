import {
    findAllAmbits,
    findAmbitById,
    createAmbit,
    updateAmbitById,
    deleteAmbitById,
} from '../repositories/ambit.repository';
import {
    OK,
    CREATED,
    NOT_FOUND,
    INVALID_ACTION,
    SUCCESS_TO_CREATE,
    SUCCESS_TO_MODIFY,
    SUCCESS_TO_REMOVE,
    FAIL_TO_MODIFY,
    NOT_FOUND_MESSAGE,
} from '../common/constants';

export const getAllAmbitsService = async () => {
    const ambits = await findAllAmbits();

    return {
        ok: true,
        statusCode: OK,
        message: 'Ambits fetched successfully',
        data: ambits,
    };
};

export const getAmbitByIdService = async (id: string) => {
    const ambit = await findAmbitById(id);

    if (!ambit) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: 'Ambit fetched successfully',
        data: ambit,
    };
};

export const createAmbitService = async (body: { name: string }) => {
    const created = await createAmbit({
        name: body.name,
    });

    return {
        ok: true,
        statusCode: CREATED,
        message: SUCCESS_TO_CREATE,
        data: created,
    };
};

export const updateAmbitService = async (
    id: string,
    body: Partial<{ name: string }>
) => {
    const updated = await updateAmbitById(id, body);

    if (!updated) {
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
        data: updated,
    };
};

export const deleteAmbitService = async (id: string) => {
    const deleted = await deleteAmbitById(id);

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
