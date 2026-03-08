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
    createTraining,
    getAll,
    getById,
    modifyTraining,
    removeTraining,
} from '../controllers/training';
const trainingRouter = Router();

trainingRouter.get('/', async (request: Request, response: Response) => {
    try {
        const trainingList = await getAll();
        if (!trainingList) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(trainingList);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching training:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error fetching training:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

trainingRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const training = await getById(id);
        if (!training) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(training);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching training by ID:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error fetching training by ID:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

trainingRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createTraining(body);
        if (!created) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_CREATE });
        }
        response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating training:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error creating training:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

trainingRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyTraining(id, body);
        if (!modified) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_MODIFY });
        }
        response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error modifying training:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error modifying training:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

trainingRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const deleted = await removeTraining(id);
        if (!deleted) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_REMOVE });
        }
        response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting training:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error deleting training:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

export default trainingRouter;
