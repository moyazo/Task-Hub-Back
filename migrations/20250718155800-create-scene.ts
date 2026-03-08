'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('scenes', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
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
    await queryInterface.dropTable('scenes');
}
