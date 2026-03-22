import { Optional } from 'sequelize';

export type TaskStatus = 'TODO' | 'DOING' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ITaskAttributes {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    user_id: string;
    category_id: string;
}

export type TaskCreationAttributes = Optional<ITaskAttributes, 'id'>;
