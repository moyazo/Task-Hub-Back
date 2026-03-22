import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('categories', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ambit_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ambits',
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

    await queryInterface.addIndex('categories', ['ambit_id'], {
        name: 'categories_ambit_id_idx',
    });

    await queryInterface.addConstraint('categories', {
        fields: ['name', 'ambit_id'],
        type: 'unique',
        name: 'categories_name_ambit_id_unique',
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint('categories', 'categories_name_ambit_id_unique');
    await queryInterface.removeIndex('categories', 'categories_ambit_id_idx');
    await queryInterface.dropTable('categories');
}