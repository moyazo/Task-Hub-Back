import { Router } from 'express';
import {
    getAllAmbitsController,
    getAmbitByIdController,
    createAmbitController,
    updateAmbitController,
    deleteAmbitController,
} from '../controllers/ambit.controller';

const ambitRouter = Router();

ambitRouter.get('/', getAllAmbitsController);
ambitRouter.get('/:id', getAmbitByIdController);
ambitRouter.post('/', createAmbitController);
ambitRouter.put('/:id', updateAmbitController);
ambitRouter.delete('/:id', deleteAmbitController);

export default ambitRouter;