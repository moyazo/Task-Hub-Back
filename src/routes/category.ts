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
    createCategory,
    getAll,
    getById,
    modifyCategory,
    removeCategory,
} from '../controllers/category';
const categoryRouter = Router();

categoryRouter.get('/', async (request: Request, response: Response) => {
    try {
        const categories = await getAll();
        if (!categories) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

categoryRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const category = await getById(id);
        if (!category) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

categoryRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createCategory(body);
        if (!created) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_CREATE });
        }
        return response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error) {
        console.error('Error creating category:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

categoryRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyCategory(id, body);
        if (!modified) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_MODIFY });
        }
        return response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error) {
        console.error('Error modifying category:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

categoryRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeCategory(id);
        if (!removed) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_REMOVE });
        }
        return response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error) {
        console.error('Error removing category:', error);
        return response
            .status(500)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

export default categoryRouter;
