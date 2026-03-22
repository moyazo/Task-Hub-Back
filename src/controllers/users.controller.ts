import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import {
    getAllUsersService,
    getUserByIdService,
    getCurrentUserService,
    updateUserService,
    deleteUserService,
} from '../services/user.service';
import { BAD_REQUEST, INVALID_REQUEST_BODY } from '../common/constants';

export const getAllUsersController = async (_req: Request, res: Response) => {
    const result = await getAllUsersService();

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getUserByIdService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getCurrentUserController = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getCurrentUserService(req.user.id);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const updateUserController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await updateUserService(id as string, req.body);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const deleteUserController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await deleteUserService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message);
};
