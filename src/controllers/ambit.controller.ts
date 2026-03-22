import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import {
    getAllAmbitsService,
    getAmbitByIdService,
    createAmbitService,
    updateAmbitService,
    deleteAmbitService,
} from '../services/ambit.service';
import { BAD_REQUEST, INVALID_REQUEST_BODY } from '../common/constants';

export const getAllAmbitsController = async (_req: Request, res: Response) => {
    const result = await getAllAmbitsService();

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getAmbitByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getAmbitByIdService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const createAmbitController = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await createAmbitService({ name });

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const updateAmbitController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await updateAmbitService(id as string, req.body);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const deleteAmbitController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await deleteAmbitService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message);
};
