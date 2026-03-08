import { Router, Request, Response } from 'express';
import { login, signup } from '../controllers/auth';
import {
    BAD_REQUEST,
    CREATED,
    FAIL_TO_CREATE,
    INVALID_REQUEST_BODY,
    LOGIN_SUCCESS,
    OK,
    SUCCESS_TO_CREATE,
    UNAUTHORIZED,
} from '../common/constants';
const authRouter = Router();

authRouter.post('/signup', async (request: Request, response: Response) => {
    const body = request.body;
    if (!body || !body.email || !body.password) {
        return response
            .status(BAD_REQUEST)
            .json({ message: INVALID_REQUEST_BODY });
    }
    const result = await signup(body);
    if (result === false) {
        return response.status(BAD_REQUEST).json({ message: FAIL_TO_CREATE });
    }
    response.cookie('token', result, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict',
    });
    return response
        .status(CREATED)
        .json({ message: SUCCESS_TO_CREATE, token: result });
});

authRouter.post('/signin', async (request: Request, response: Response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response
            .status(BAD_REQUEST)
            .json({ message: INVALID_REQUEST_BODY });
    }
    const user = await login(email, password);
    if (!user) {
        return response
            .status(UNAUTHORIZED)
            .json({ message: 'Invalid email or password' });
    }
    return response.status(OK).json({ message: LOGIN_SUCCESS, token: user });
});

export default authRouter;
