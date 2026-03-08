import { Router, Request, Response } from 'express';
import { getAll } from '../controllers/diet';
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
    createDiet,
    getById,
    modifyDiet,
    removeDiet,
} from '../controllers/diet';
const dietRouter = Router();

dietRouter.get('/', async (request: Request, response: Response) => {
    try {
        const diets = await getAll();
        if (!diets) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(diets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
        } else {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

dietRouter.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const diet = await getById(id);
        if (!diet) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(diet);
    } catch (error: unknown) {
        if (error instanceof Error) {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
        } else {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

dietRouter.post('/', async (request: Request, response: Response) => {
    const body = request.body;
    try {
        const created = await createDiet(body);
        if (!created) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_CREATE });
        }
        response.status(201).json({ message: SUCCESS_TO_CREATE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
        } else {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

dietRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyDiet(id, body);
        if (!modified) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_MODIFY });
        }
        response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
        } else {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

dietRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeDiet(id);
        if (!removed) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_REMOVE });
        }
        response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: error.message });
        } else {
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

export default dietRouter;
