const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const Legend = sequelize.define('Legend', {
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
    deliveryTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    to: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Legend.associate = (models) => {
    Legend.belongsTo(models.Truck, {
        foreignKey: 'truckId',
        as: 'Truck',
    })
};

module.exports = Legend;