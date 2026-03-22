import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('tasks', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM('TODO', 'DOING', 'DONE'),
            allowNull: false,
            defaultValue: 'TODO',
        },

        priority: {
            type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
            allowNull: false,
            defaultValue: 'MEDIUM',
        },

        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    await queryInterface.addIndex('tasks', ['user_id'], {
        name: 'tasks_user_id_idx',
    });

    await queryInterface.addIndex('tasks', ['category_id'], {
        name: 'tasks_category_id_idx',
    });

    await queryInterface.addIndex('tasks', ['status'], {
        name: 'tasks_status_idx',
    });

    await queryInterface.addIndex('tasks', ['dueDate'], {
        name: 'tasks_due_date_idx',
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('tasks', 'tasks_due_date_idx');
    await queryInterface.removeIndex('tasks', 'tasks_status_idx');
    await queryInterface.removeIndex('tasks', 'tasks_category_id_idx');
    await queryInterface.removeIndex('tasks', 'tasks_user_id_idx');
    await queryInterface.dropTable('tasks');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tasks_priority";');
}