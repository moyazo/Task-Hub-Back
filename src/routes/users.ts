import { Router, Request, Response } from 'express';
import {
    BAD_REQUEST,
    CREATED,
    FAIL_TO_CREATE,
    OK,
    SUCCESS_TO_CREATE,
    NOT_FOUND_MESSAGE,
    INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_MESSAGE,
    FAIL_TO_MODIFY,
    SUCCESS_TO_MODIFY,
    FAIL_TO_REMOVE,
    SUCCESS_TO_REMOVE,
    INVALID_REQUEST_BODY,
} from '../common/constants';
import {
    configData,
    createUser,
    toggleFollowDiet,
    toggleFollowRutine,
    getAll,
    getById,
    modifyUser,
    removeUser,
    toggleStartTraining,
} from '../controllers/users';
const userRouter = Router();

userRouter.get('/', async (request: Request, response: Response) => {
    try {
        const users = await getAll();
        if (!users) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

userRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const user = await getById(id);
        if (!user) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

userRouter.post('/', async (request: Request, response: Response) => {
    const body = request.body;
    try {
        const created = await createUser(body);
        if (!created) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_CREATE });
        }
        return response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error) {
        console.error('Error creating user:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

userRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyUser(id, body);
        if (!modified) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_MODIFY });
        }
        return response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error) {
        console.error('Error modifying user:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

userRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleted = await removeUser(id);
        if (!deleted) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_REMOVE });
        }
        return response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error) {
        console.error('Error deleting user:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

userRouter.post(
    '/configData/:id',
    async (request: Request, response: Response) => {
        const body = request.body;
        const { id } = request.params;
        if (!id || !body) {
            return response.status(BAD_REQUEST).json({
                message: 'User ID and configuration data are required',
            });
        }
        try {
            const config = await configData(id, body);
            if (!config) {
                return response.status(BAD_REQUEST).json({
                    message: INVALID_REQUEST_BODY,
                });
            }
            return response.status(201).json({
                message: SUCCESS_TO_CREATE,
            });
        } catch (error) {
            console.error('Error creating user configuration data:', error);
            return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
);

userRouter.put(
    '/configDataReset/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        if (!id) {
            return response.status(BAD_REQUEST).json({
                message: INVALID_REQUEST_BODY,
            });
        }
        try {
            const reset = await configData(id, null);
            if (!reset) {
                return response.status(BAD_REQUEST).json({
                    message: FAIL_TO_MODIFY,
                });
            }
            return response.status(OK).json({
                message: SUCCESS_TO_MODIFY,
            });
        } catch (error) {
            console.error('Error resetting user configuration data:', error);
            return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
);

userRouter.post(
    '/toggleFollowRutine/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { rutine_id } = request.body;
        if (!id || !rutine_id) {
            return response.status(BAD_REQUEST).json({
                message: INVALID_REQUEST_BODY,
            });
        }
        try {
            const follow = await toggleFollowRutine(id, rutine_id);
            if (!follow.updated) {
                return response.status(BAD_REQUEST).json({
                    message: FAIL_TO_MODIFY,
                });
            }
            if (follow.toggle === 'unfollowed') {
                return response.status(OK).json({
                    message: 'Rutine unfollowed successfully',
                });
            } else if (follow.toggle === 'followed') {
                return response.status(OK).json({
                    message: 'Rutine followed successfully',
                });
            } else {
                return response.status(BAD_REQUEST).json({
                    message: FAIL_TO_MODIFY,
                });
            }
        } catch (error) {
            console.error('Error following routine:', error);
            return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
);

userRouter.post(
    '/toggleFollowDiet/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { diet_id } = request.body;
        if (!id || !diet_id) {
            return response.status(BAD_REQUEST).json({
                message: INVALID_REQUEST_BODY,
            });
        }
        try {
            const follow = await toggleFollowDiet(id, diet_id);
            if (!follow.updated) {
                return response.status(BAD_REQUEST).json({
                    message: FAIL_TO_MODIFY,
                });
            }

            if (follow.toggle === 'unfollowed') {
                return response.status(OK).json({
                    message: 'Diet unfollowed successfully',
                });
            } else if (follow.toggle === 'followed') {
                return response.status(OK).json({
                    message: 'Diet followed successfully',
                });
            } else {
                return response.status(BAD_REQUEST).json({
                    message: FAIL_TO_MODIFY,
                });
            }
        } catch (error) {
            console.error('Error following diet:', error);
            return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
);

userRouter.post(
    '/toggleTraining/:id',
    async (request: Request, response: Response) => {
        const { id } = request.params;
        const { training_id } = request.body;
        if (!id || !training_id) {
            return response.status(BAD_REQUEST).json({
                message: 'User ID and training data are required',
            });
        }
        try {
            const started = await toggleStartTraining(id, training_id);
            if (!started.updated) {
                return response.status(BAD_REQUEST).json({
                    message: 'Failed to start training',
                });
            }

            if (started.toggle === 'stopped') {
                return response.status(OK).json({
                    message: 'Training stopped successfully',
                });
            } else if (started.toggle === 'started') {
                return response.status(OK).json({
                    message: 'Training started successfully',
                });
            } else {
                return response.status(BAD_REQUEST).json({
                    message: 'Unexpected toggle state',
                });
            }
        } catch (error) {
            console.error('Error starting training:', error);
            return response
                .status(INTERNAL_SERVER_ERROR)
                .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
);

export default userRouter;
