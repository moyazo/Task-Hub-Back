import { Router } from 'express';
import {
    createTaskController,
    deleteTaskController,
    getAllTasksController,
    getTaskByIdController,
    getTasksByCategoryIdController,
    getTasksByUserIdController,
    updateTaskController,
} from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', getAllTasksController);
taskRouter.get('/user/:userId', getTasksByUserIdController);
taskRouter.get('/category/:categoryId', getTasksByCategoryIdController);
taskRouter.get('/:id', getTaskByIdController);
taskRouter.post('/', createTaskController);
taskRouter.put('/:id', updateTaskController);
taskRouter.delete('/:id', deleteTaskController);

export default taskRouter;
