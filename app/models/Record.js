const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const Record = sequelize.define('Record', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    note: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    isImportant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Record.associate = (models) => {
    Record.belongsTo(models.Truck, {
        foreignKey: 'truckId',
        as: 'Truck',
    });
};

module.exports = Record;