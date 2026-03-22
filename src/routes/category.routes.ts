import { Router } from 'express';
import {
    getAllCategoriesController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
} from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesController);
categoryRouter.get('/:id', getCategoryByIdController);
categoryRouter.post('/', createCategoryController);
categoryRouter.put('/:id', updateCategoryController);
categoryRouter.delete('/:id', deleteCategoryController);

export default categoryRouter;