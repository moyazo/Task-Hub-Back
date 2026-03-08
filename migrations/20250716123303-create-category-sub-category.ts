'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('categorysubcategories', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        category_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'categories',
                key: 'id',
            },
            allowNull: false,
        },
        subCategory_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'subcategories',
                key: 'id',
            },
            allowNull: false,
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
    await queryInterface.dropTable('categorysubcategories');
}
