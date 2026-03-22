import { Router } from 'express';
import {
    getAllUsersController,
    getUserByIdController,
    getCurrentUserController,
    updateUserController,
    deleteUserController,
} from '../controllers/users.controller';

const usersRouter = Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/me', getCurrentUserController);
usersRouter.get('/:id', getUserByIdController);
usersRouter.put('/:id', updateUserController);
usersRouter.delete('/:id', deleteUserController);

export default usersRouter;
