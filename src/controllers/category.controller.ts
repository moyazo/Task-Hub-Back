import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import {
    getAllCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
} from '../services/category.service';
import { BAD_REQUEST, INVALID_REQUEST_BODY } from '../common/constants';

export const getAllCategoriesController = async (
    _req: Request,
    res: Response
) => {
    const result = await getAllCategoriesService();

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getCategoryByIdController = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getCategoryByIdService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const createCategoryController = async (req: Request, res: Response) => {
    const { name, ambit_id } = req.body;

    if (!name || !ambit_id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await createCategoryService({ name, ambit_id });

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const updateCategoryController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await updateCategoryService(id as string, req.body);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const deleteCategoryController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await deleteCategoryService(id  as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message);
};
