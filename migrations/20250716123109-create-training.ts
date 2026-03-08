'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('trainings', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        category_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'categories',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('trainings');
}
