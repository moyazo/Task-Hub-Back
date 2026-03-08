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
    createGoal,
    getAll,
    getById,
    modifyGoal,
    removeGoal,
} from '../controllers/goals';
const goalRouter = Router();

goalRouter.get('/', async (request: Request, response: Response) => {
    try {
        const goals = await getAll(); // Assuming getAllGoals is a function that fetches all goals
        if (!goals) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(goals);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching goals:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error fetching goals:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

goalRouter.get('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const goal = await getById(goalId); // Assuming getById is a function that fetches a goal by ID
        if (!goal) {
            return response
                .status(BAD_REQUEST)
                .json({ error: NOT_FOUND_MESSAGE });
        }
        response.status(OK).json(goal);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching goal:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error fetching goal:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

goalRouter.post('/', async (request: Request, response: Response) => {
    try {
        const body = request.body; // Assuming body contains the goal data
        const created = await createGoal(body); // Assuming createGoal is a function that creates a new goal
        if (!created) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_CREATE });
        }
        response.status(CREATED).json({ message: SUCCESS_TO_CREATE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating goal:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error creating goal:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

goalRouter.put('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const body = request.body; // Assuming body contains the updated goal data
        const modified = await modifyGoal(goalId, body); // Assuming modifyGoal is a function that modifies a goal
        if (!modified) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_MODIFY });
        }
        response.status(OK).json({ message: SUCCESS_TO_MODIFY });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error modifying goal:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error modifying goal:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

goalRouter.delete('/:id', async (request: Request, response: Response) => {
    try {
        const goalId = request.params.id;
        const removed = await removeGoal(goalId); // Assuming removeGoal is a function that removes a goal
        if (!removed) {
            return response.status(BAD_REQUEST).json({ error: FAIL_TO_REMOVE });
        }
        response.status(OK).json({ message: SUCCESS_TO_REMOVE });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error removing goal:', error.message);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        } else {
            console.error('Unknown error removing goal:', error);
            response
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
        }
    }
});

export default goalRouter;
