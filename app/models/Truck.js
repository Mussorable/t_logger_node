const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const Truck = sequelize.define('Truck', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    number: {
        type: Sequelize.STRING(12),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Truck.associate = (models) => {
    Truck.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User',
    });
};

module.exports = Truck;