'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('subcategories', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        type: {
            allowNull: false,
            type: DataTypes.ENUM('Diet', 'Training'),
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
    await queryInterface.dropTable('subcategories');
}
