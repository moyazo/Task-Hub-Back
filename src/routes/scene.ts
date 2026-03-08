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
    createScene,
    getAll,
    getById,
    modifyScene,
    removeScene,
} from '../controllers/scene';
const sceneRouter = Router();

sceneRouter.get('/', async (request: Request, response: Response) => {
    try {
        const scenes = await getAll();
        if (!scenes) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(scenes);
    } catch (error) {
        console.error('Error fetching scenes:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

sceneRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const scene = await getById(id);
        if (!scene) {
            return response
                .status(BAD_REQUEST)
                .json({ message: NOT_FOUND_MESSAGE });
        }
        return response.status(OK).json(scene);
    } catch (error) {
        console.error('Error fetching scene by ID:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

sceneRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const created = await createScene(body);
        if (!created) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_CREATE });
        }
        return response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error) {
        console.error('Error creating scene:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

sceneRouter.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const body = request.body;
    try {
        const modified = await modifyScene(id, body);
        if (!modified) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_MODIFY });
        }
        return response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error) {
        console.error('Error modifying scene:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

sceneRouter.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removed = await removeScene(id);
        if (!removed) {
            return response
                .status(BAD_REQUEST)
                .json({ message: FAIL_TO_REMOVE });
        }
        return response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error) {
        console.error('Error removing scene:', error);
        return response
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    }
});

export default sceneRouter;
