import { Response } from 'express';
import { CustomResponse } from '../common/types/custom-response';

export const sendSuccess = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
) => {
    const payload: CustomResponse<T> = {
        success: true,
        message,
        data,
    };

    return res.status(statusCode).json(payload);
};

export const sendError = (
    res: Response,
    statusCode: number,
    message: string,
    errors?: string[]
) => {
    const payload: CustomResponse = {
        success: false,
        message,
        errors,
    };

    return res.status(statusCode).json(payload);
};