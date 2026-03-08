'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.TEXT(),
        },
        email: {
            type: new DataTypes.TEXT(),
        },
        password: {
            type: new DataTypes.TEXT(),
        },
        username: {
            type: new DataTypes.TEXT(),
        },
        role: {
            type: new DataTypes.ENUM('ADMIN', 'NORMAL'),
        },
        age: {
            type: new DataTypes.INTEGER(),
        },
        height: {
            type: new DataTypes.INTEGER(),
        },
        weight: {
            type: new DataTypes.INTEGER(),
        },
        imc: {
            type: new DataTypes.INTEGER(),
        },
        tmb: {
            type: new DataTypes.INTEGER(),
        },
        tdee: {
            type: new DataTypes.INTEGER(),
        },
        fat: {
            type: new DataTypes.INTEGER(),
        },
        muscle: {
            type: new DataTypes.INTEGER(),
        },
        bony: {
            type: new DataTypes.INTEGER(),
        },
        fitnessStyle: {
            type: new DataTypes.ENUM('1', '2', '3', '4', '5'),
        },
        sex: {
            type: new DataTypes.ENUM('Male', 'Woman', 'Other'),
        },
        training_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'trainings',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        diet_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'diets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        rutine_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'rutines',
                key: 'id',
            },
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
    await queryInterface.dropTable('users');
}
