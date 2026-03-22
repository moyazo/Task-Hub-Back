import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import { signupService, signinService } from '../services/auth.service';
import {
    BAD_REQUEST,
    OK,
    INVALID_REQUEST_BODY,
    LOGIN_SUCCESS,
    CREATED,
    SUCCESS_TO_CREATE,
} from '../common/constants';


export const signupController = async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await signupService({
        name,
        email,
        username,
        password,
    });

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    res.cookie('token', result.data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000,
    });

    return sendSuccess(res, CREATED, SUCCESS_TO_CREATE, result.data);
};

export const signinController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(res, BAD_REQUEST, INVALID_REQUEST_BODY);
    }

    const result = await signinService(email, password);

    if (!result.ok) {
        return sendError(res, result.statusCode, result.message);
    }

    res.cookie('token', result.data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000,
    });

    return sendSuccess(res, OK, LOGIN_SUCCESS, result.data);
};

export const signoutController = async (_req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return sendSuccess(res, OK, 'Logout successful');
};
