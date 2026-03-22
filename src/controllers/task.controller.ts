import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import {
    getAllTasksService,
    getTaskByIdService,
    getTasksByUserIdService,
    getTasksByCategoryIdService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
} from '../services/task.service';
import { BAD_REQUEST, INVALID_REQUEST_BODY } from '../common/constants';

export const getAllTasksController = async (_req: Request, res: Response) => {
    const result = await getAllTasksService();

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getTaskByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getTaskByIdService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getTasksByUserIdController = async (
    req: Request,
    res: Response
) => {
    const { userId } = req.params;

    if (!userId) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getTasksByUserIdService(userId as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const getTasksByCategoryIdController = async (
    req: Request,
    res: Response
) => {
    const { categoryId } = req.params;

    if (!categoryId) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await getTasksByCategoryIdService(categoryId as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const createTaskController = async (req: Request, res: Response) => {
    const {
        title,
        description,
        status,
        priority,
        dueDate,
        user_id,
        category_id,
    } = req.body;

    if (
        !title ||
        !description ||
        !status ||
        !priority ||
        !dueDate ||
        !user_id ||
        !category_id
    ) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await createTaskService({
        title,
        description,
        status,
        priority,
        dueDate,
        user_id,
        category_id,
    });

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const updateTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await updateTaskService(id as string, req.body);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message, result.data);
};

export const deleteTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await deleteTaskService(id as string);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    return sendSuccess(res, result.statusCode, result.message);
};
