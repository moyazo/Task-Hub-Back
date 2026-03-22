import {
    findAllTasks,
    findTaskById,
    findTasksByUserId,
    findTasksByCategoryId,
    createTask,
    updateTaskById,
    deleteTaskById,
} from '../repositories/task.repository';
import { findUserById } from '../repositories/user.repository';
import { findCategoryById } from '../repositories/category.repository';
import { TaskPriority, TaskStatus } from '../interfaces/task.interface';

const VALID_STATUS: TaskStatus[] = ['TODO', 'DOING', 'DONE'];
const VALID_PRIORITY: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

export const getAllTasksService = async () => {
    const tasks = await findAllTasks();

    return {
        ok: true,
        statusCode: 200,
        message: 'Tasks fetched successfully',
        data: tasks,
    };
};

export const getTaskByIdService = async (id: string) => {
    const task = await findTaskById(id);

    if (!task) {
        return {
            ok: false,
            statusCode: 404,
            message: 'Task not found',
        };
    }

    return {
        ok: true,
        statusCode: 200,
        message: 'Task fetched successfully',
        data: task,
    };
};

export const getTasksByUserIdService = async (userId: string) => {
    const user = await findUserById(userId);

    if (!user) {
        return {
            ok: false,
            statusCode: 404,
            message: 'User not found',
        };
    }

    const tasks = await findTasksByUserId(userId);

    return {
        ok: true,
        statusCode: 200,
        message: 'User tasks fetched successfully',
        data: tasks,
    };
};

export const getTasksByCategoryIdService = async (categoryId: string) => {
    const category = await findCategoryById(categoryId);

    if (!category) {
        return {
            ok: false,
            statusCode: 404,
            message: 'Category not found',
        };
    }

    const tasks = await findTasksByCategoryId(categoryId);

    return {
        ok: true,
        statusCode: 200,
        message: 'Category tasks fetched successfully',
        data: tasks,
    };
};

export const createTaskService = async (body: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    user_id: string;
    category_id: string;
}) => {
    const user = await findUserById(body.user_id);
    if (!user) {
        return {
            ok: false,
            statusCode: 404,
            message: 'User not found',
        };
    }

    const category = await findCategoryById(body.category_id);
    if (!category) {
        return {
            ok: false,
            statusCode: 404,
            message: 'Category not found',
        };
    }

    if (!VALID_STATUS.includes(body.status)) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Invalid task status',
        };
    }

    if (!VALID_PRIORITY.includes(body.priority)) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Invalid task priority',
        };
    }

    const created = await createTask({
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        dueDate: new Date(body.dueDate),
        user_id: body.user_id,
        category_id: body.category_id,
    });

    return {
        ok: true,
        statusCode: 201,
        message: 'Created successfully',
        data: created,
    };
};

export const updateTaskService = async (
    id: string,
    body: Partial<{
        title: string;
        description: string;
        status: TaskStatus;
        priority: TaskPriority;
        dueDate: Date;
        user_id: string;
        category_id: string;
    }>
) => {
    const existingTask = await findTaskById(id);

    if (!existingTask) {
        return {
            ok: false,
            statusCode: 404,
            message: 'Task not found',
        };
    }

    if (body.user_id) {
        const user = await findUserById(body.user_id);
        if (!user) {
            return {
                ok: false,
                statusCode: 404,
                message: 'User not found',
            };
        }
    }

    if (body.category_id) {
        const category = await findCategoryById(body.category_id);
        if (!category) {
            return {
                ok: false,
                statusCode: 404,
                message: 'Category not found',
            };
        }
    }

    if (body.status && !VALID_STATUS.includes(body.status)) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Invalid task status',
        };
    }

    if (body.priority && !VALID_PRIORITY.includes(body.priority)) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Invalid task priority',
        };
    }

    const dataToUpdate = {
        ...body,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    };

    const updated = await updateTaskById(id, dataToUpdate);

    if (!updated) {
        return {
            ok: false,
            statusCode: 400,
            message: 'Fail to modify',
        };
    }

    return {
        ok: true,
        statusCode: 200,
        message: 'Modified successfully',
        data: updated,
    };
};

export const deleteTaskService = async (id: string) => {
    const deleted = await deleteTaskById(id);

    if (!deleted) {
        return {
            ok: false,
            statusCode: 404,
            message: 'Task not found',
        };
    }

    return {
        ok: true,
        statusCode: 200,
        message: 'Removed successfully',
    };
};
