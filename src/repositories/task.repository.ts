import db from '../models';
import Task from '../models/task';
import User from '../models/user';
import Category from '../models/category';
import {
    TaskCreationAttributes,
    TaskStatus,
    TaskPriority,
} from '../interfaces/task.interface';

const taskModel = db.sequelize.models.Task as typeof Task;

export type UpdateTaskRepositoryInput = Partial<{
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    user_id: string;
    category_id: string;
}>;

export const findAllTasks = async () => {
    return taskModel.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email', 'username', 'role'],
            },
            {
                model: Category,
                attributes: ['id', 'name', 'ambit_id'],
            },
        ],
        order: [['dueDate', 'ASC']],
    });
};

export const findTaskById = async (id: string) => {
    return taskModel.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email', 'username', 'role'],
            },
            {
                model: Category,
                attributes: ['id', 'name', 'ambit_id'],
            },
        ],
    });
};

export const findTasksByUserId = async (userId: string) => {
    return taskModel.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Category,
                attributes: ['id', 'name', 'ambit_id'],
            },
        ],
        order: [['dueDate', 'ASC']],
    });
};

export const findTasksByCategoryId = async (categoryId: string) => {
    return taskModel.findAll({
        where: { category_id: categoryId },
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email', 'username', 'role'],
            },
        ],
        order: [['dueDate', 'ASC']],
    });
};

export const createTask = async (data: TaskCreationAttributes) => {
    return taskModel.create({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        user_id: data.user_id,
        category_id: data.category_id,
    });
};

export const updateTaskById = async (
    id: string,
    data: UpdateTaskRepositoryInput
) => {
    const task = await taskModel.findByPk(id);
    if (!task) return null;

    await task.update(data);
    return task;
};

export const deleteTaskById = async (id: string) => {
    const task = await taskModel.findByPk(id);
    if (!task) return false;

    await task.destroy();
    return true;
};
