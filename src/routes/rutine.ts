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
} from '../common/constants';
import {
    createRutine,
    getAll,
    getById,
    modifyRutine,
    removeRutine,
} from '../controllers/rutine';
const rutineRouter = Router();

rutineRouter.get('/', async (request: Request, response: Response) => {
    try {
        const routines = await getAll();
        if (!routines) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(routines);
    } catch (error) {
        console.error('Error fetching routines:', error);
        response
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

rutineRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const routine = await getById(id);
        if (!routine) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(routine);
    } catch (error) {
        console.error('Error fetching routine:', error);
        response
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

rutineRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createRutine(body);
        if (!created) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_CREATE });
        }
        response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error) {
        console.error('Error creating routine:', error);
        response
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

rutineRouter.put('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const body = request.body;
        const modified = await modifyRutine(id, body);
        if (!modified) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_MODIFY });
        }
        response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error) {
        console.error('Error modifying routine:', error);
        response
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

rutineRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const removed = await removeRutine(id);
        if (!removed) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_REMOVE });
        }
        response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error) {
        console.error('Error removing routine:', error);
        response
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

export default rutineRouter;
