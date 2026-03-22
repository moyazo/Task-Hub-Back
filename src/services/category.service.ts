import {
    findAllCategories,
    findCategoryById,
    findCategoryByNameAndAmbitId,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
} from '../repositories/category.repository';
import { findAmbitById } from '../repositories/ambit.repository';
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

export const getAllCategoriesService = async () => {
    const categories = await findAllCategories();

    return {
        ok: true,
        statusCode: OK,
        message: 'Categories fetched successfully',
        data: categories,
    };
};

export const getCategoryByIdService = async (id: string) => {
    const category = await findCategoryById(id);

    if (!category) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    return {
        ok: true,
        statusCode: OK,
        message: 'Category fetched successfully',
        data: category,
    };
};

export const createCategoryService = async (body: {
    name: string;
    ambit_id: string;
}) => {
    const ambit = await findAmbitById(body.ambit_id);

    if (!ambit) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: 'Ambit not found',
        };
    }

    const existingCategory = await findCategoryByNameAndAmbitId(
        body.name,
        body.ambit_id
    );

    if (existingCategory) {
        return {
            ok: false,
            statusCode: INVALID_ACTION,
            message: 'Category already exists in this ambit',
        };
    }

    const created = await createCategory({
        name: body.name,
        ambit_id: body.ambit_id,
    });

    return {
        ok: true,
        statusCode: CREATED,
        message: SUCCESS_TO_CREATE,
        data: created,
    };
};

export const updateCategoryService = async (
    id: string,
    body: Partial<{
        name: string;
        ambit_id: string;
    }>
) => {
    const existingCategory = await findCategoryById(id);

    if (!existingCategory) {
        return {
            ok: false,
            statusCode: NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        };
    }

    const targetAmbitId = body.ambit_id || existingCategory.ambit_id;

    if (body.ambit_id) {
        const ambit = await findAmbitById(body.ambit_id);

        if (!ambit) {
            return {
                ok: false,
                statusCode: NOT_FOUND,
                message: 'Ambit not found',
            };
        }
    }

    if (body.name) {
        const categoryWithSameName = await findCategoryByNameAndAmbitId(
            body.name,
            targetAmbitId
        );

        if (categoryWithSameName && categoryWithSameName.id !== id) {
            return {
                ok: false,
                statusCode: INVALID_ACTION,
                message: 'Category already exists in this ambit',
            };
        }
    }

    const updated = await updateCategoryById(id, body);

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

export const deleteCategoryService = async (id: string) => {
    const deleted = await deleteCategoryById(id);

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
